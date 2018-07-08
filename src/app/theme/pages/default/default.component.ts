import { Privilege, User_Session_Keys } from './../../../atk/model/interface';
import { AuthenticationService } from './../../../auth/_services/authentication.service';
import { UserSessionService } from './../../../atk/services/app-user-session.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Helpers } from '../../../helpers';
import { ScriptLoaderService } from '../../../_services/script-loader.service';
import { Type_Of_Account } from '../../../atk/model/interface';


@Component({
    selector: ".m-grid__item.m-grid__item--fluid.m-grid.m-grid--ver-desktop.m-grid--desktop.m-body",
    templateUrl: "./default.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class DefaultComponent implements OnInit {

    currentUserType;
    currentManagedUser: Privilege;
    constructor(private userSession: UserSessionService
        , private authService: AuthenticationService) {

    }
    ngOnInit() {
        this.currentUserType = this.authService.CurrentUserType;
        if (this.currentUserType = Type_Of_Account.CreatorManager) {
            this.currentManagedUser = this.userSession.getSessionKey(User_Session_Keys.Managed_User);
            this.getManagedUser$();
        }
    }

    getManagedUser$() {
        this.userSession
            .getSessionKey$(User_Session_Keys.Managed_User)
            .subscribe(res => {
                if (res.name == User_Session_Keys.Managed_User) {
                    this.currentManagedUser = res.value;
                }
            })
    }

}