import { Router } from '@angular/router';
import { User_Session_Keys } from './../../../atk/model/interface';
import { Subject } from 'rxjs/Subject';
import { AuthenticationService } from './../../../auth/_services/authentication.service';
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../helpers';
import { Privilege, Type_Of_Account, Privilege_type, Privilege_Key } from '../../../atk/model/interface';
import { UserSessionService } from '../../../atk/services/app-user-session.service';

declare let mLayout: any;
@Component({
    selector: "app-aside-nav",
    templateUrl: "./aside-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent implements OnInit, AfterViewInit {
    userType;
    userId;
    isLoaded = false;
    privilegeLinks = {};
    selectedUser = <Privilege>{};
    private ngUnsubscribe = new Subject<void>(); // for unscubscribe any observer before destroy component
    constructor(private userSession: UserSessionService
        , private router: Router
        , private authSer: AuthenticationService) {

    }
    ngOnInit() {
        this.userType = this.authSer.CurrentUserType;
        this.userId = this.authSer.currentUser.id;
        this.privilegeLinks = this.authSer.PrivilegeKeys;
        this.getManagedUser$();
    }
    ngAfterViewInit() {
        if (!this.isLoaded) {
            mLayout.initAside();
            this.isLoaded = true;
        }
        // let menu = mLayout.getAsideMenu();
        // let item = $(menu).find('a[href="' + window.location.pathname + '"]')
        //     .parent('.m-menu__item'); (<any>$(menu).data('menu')).setActiveItem(item);
    }

    getManagedUser$() {
        this.userSession
            .getSessionKey$(User_Session_Keys.Managed_User_Change)
            .takeUntil(this.ngUnsubscribe)
            .subscribe(res => {
                if (res.name == User_Session_Keys.Managed_User_Change) {
                    this.privilegeLinks = this.authSer.PrivilegeKeys;
                }
            })
    }

    gotoSubscriber() {
        this.selectedUser = this.userSession.getSessionKey(User_Session_Keys.Managed_User);
        this.router.navigate(['/contentcreator/subscriber'], {
            queryParams: {
                id: this.selectedUser ? this.selectedUser.id : 0
            }
        })
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}