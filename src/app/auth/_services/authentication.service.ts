import { XpObject, Type_Of_Account, Privilege_Key, User_Session_Keys, Privilege, Privilege_type } from './../../atk/model/interface';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { User, UserLogin } from '../../atk/model/interface';
import { CONFIG } from '../../atk/services/config.service';
import { HttpGeneralService } from '../../atk/services/http-general.service';
import { Observable } from 'rxjs/Observable';
import { UserSessionService } from './../../atk/services/app-user-session.service';
import { UserSessionKeys } from '../../atk/shared/user-session-keys';

const loginUrl = CONFIG.baseUrls.users;

@Injectable()
export class AuthenticationService {

    currentUser: User;
    xpObject: XpObject;
    UserLogin: UserLogin;
    private privilegeKeys = <Privilege>{};
    private noprivilegeKeys = <Privilege>{};
    constructor(private http: HttpGeneralService,
        private userSession: UserSessionService) {
        const values = Object.keys(Privilege_Key).map(key => Privilege_Key[key]).filter(value => typeof value === 'string') as string[];
        for (let type of values) {
            this.noprivilegeKeys[type] = 4;
        }
    }

    login(email: string, password: string) {
        // if (sessionStorage.getItem('currentUser')) {
        //     return Observable.of({
        //         success: 'true',
        //         user: this.currentUser,
        //         xpObject: this.xpObject
        //     });
        // }
        return this.http
            .httpLogin({ email: email, password: password }, `${loginUrl}/login`)
            .map((response: UserLogin) => {
                // login successful if there's a jwt token in the response
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                if (response['success']) {
                    sessionStorage.setItem('currentUser', JSON.stringify(response.user));
                    sessionStorage.setItem('token', JSON.stringify(response['token']));
                    this.UserLogin = response;
                    this.currentUser = response['user'];
                    this.xpObject = response['xpObject'];
                    this.userSession.setSessionKey(UserSessionKeys.CurrentUser, this.currentUser);
                    this.userSession.setSessionKey(UserSessionKeys.XpObject, this.xpObject);
                }
                return response;
            });
    }

    getUserInfo(): UserLogin {
        return this.currentUser ? this.currentUser : JSON.parse(sessionStorage.getItem('currentUser'));
    }

    getCurrentUser(): User {
        this.currentUser = this.currentUser ? this.currentUser : JSON.parse(sessionStorage.getItem('currentUser'));
        return this.currentUser;
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('token');
    }

    isLogin() {

        this.currentUser = this.currentUser ? this.currentUser : JSON.parse(sessionStorage.getItem('currentUser'));
        let flag = false;
        // create authorization header with jwt token
        // const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        if (this.currentUser) {
            flag = true;
        }
        return flag;
    }

    get CurrentUserType() {
        return this.currentUser ? this.currentUser.type_of_account : this.getCurrentUser().type_of_account;
    }

    get CurrentUser(): User {
        return this.currentUser ? this.currentUser : this.getCurrentUser();
    }


    checkUserPrivileges(key: string, value: Privilege_type): boolean {
        let flag = true;
        if (this.CurrentUserType == Type_Of_Account.CreatorManager) {
            const ass: Privilege = this.userSession.getSessionKey(User_Session_Keys.Managed_User);
            switch (key) {
                case Privilege_Key.posts:
                    flag = ass.posts >= value;
                    break;
                case Privilege_Key.comments:
                    flag = ass.comments >= value;
                    break;
                case Privilege_Key.likes:
                    flag = ass.likes >= value;
                    break;
                case Privilege_Key.tiers: break;
                case Privilege_Key.orders: break;
                case Privilege_Key.skus: break;
                case Privilege_Key.get_subscribers: break;
                case Privilege_Key.reports: break;
                case Privilege_Key.block_users: break;
                case Privilege_Key.chat_messages: break;
            }
        }

        return flag;
    }

    getPrivilegeKey(key: string): number {
        let flag = 0;
        if (this.CurrentUserType == Type_Of_Account.CreatorManager) {
            const obj: Privilege = this.userSession.getSessionKey(User_Session_Keys.Managed_User);
            if (obj) {
                const ass = obj.privileges;
                switch (key) {
                    case Privilege_Key.posts:
                        flag = ass.posts;
                        break;
                    case Privilege_Key.comments:
                        flag = ass.comments;
                        break;
                    case Privilege_Key.likes:
                        flag = ass.likes;
                        break;
                    case Privilege_Key.tiers:
                        flag = ass.tiers;
                        break;
                    case Privilege_Key.orders:
                        flag = ass.orders;
                        break;
                    case Privilege_Key.skus:
                        flag = ass.skus;
                        break;
                    case Privilege_Key.get_subscribers:
                        flag = ass.get_subscribers;
                        break;
                    case Privilege_Key.reports:
                        flag = ass.reports;
                        break;
                    case Privilege_Key.block_users:
                        flag = ass.block_users;
                        break;
                    case Privilege_Key.chat_messages:
                        flag = ass.chat_messages;
                        break;
                }
            }
        }

        return flag;
    }


    set PrivilegeKeys(value) {
        if (value && this.CurrentUserType == Type_Of_Account.CreatorManager) {
            const values = Object.keys(Privilege_Key).map(key => Privilege_Key[key]).filter(value => typeof value === 'string') as string[];
            for (let type of values) {
                this.privilegeKeys[type] = value.privileges[type];
            }
            this.userSession.setSessionKey(User_Session_Keys.Managed_User_Change, true);
        } else if (value && this.CurrentUserType == Type_Of_Account.CreatorManager) {
            this.userSession.setSessionKey(User_Session_Keys.Managed_User_Change, true);
        }
    }

    get PrivilegeKeys() {
        if (this.CurrentUserType == Type_Of_Account.CreatorManager) {
            return this.privilegeKeys;
        } else {
            return this.noprivilegeKeys;
        }
    }
    // get CurrentUserTier() {
    //     return this.currentUser ? this.currentUser : null;
    // }
}
