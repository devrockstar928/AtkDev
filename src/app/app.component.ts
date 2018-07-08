import { AuthenticationService } from './auth/_services/authentication.service';
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Helpers } from './helpers';
import { UserSessionService } from './atk/services/app-user-session.service';
import { User_Session_Keys } from './atk/model/interface';
import { UserSessionKeys } from './atk/shared/user-session-keys';
import { ScriptLoaderService } from './_services/script-loader.service';

@Component({
    selector: 'body',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewInit {
    title = 'app';
    globalBodyClass = 'm-page--loading-non-block m-page--fluid m--skin- m-content--skin-light2 m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--fixed m-aside-left--skin-dark m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default';
    isLogin = false;
    constructor(private _router: Router,
        private userSession: UserSessionService,
        private _script: ScriptLoaderService,
        public authSer: AuthenticationService) {
    }

    ngOnInit() { 
        this._router.events.subscribe((route) => {
            if (route instanceof NavigationStart) {
                Helpers.setLoading(true);
                Helpers.bodyClass(this.globalBodyClass);
            }
            if (route instanceof NavigationEnd) {
                Helpers.setLoading(false);
            }
        });
        this.isLogin = this.authSer.isLogin();
        if (this.isLogin) {
            this.getManagedUser$(); 
        }
        this.listenToLogin();
    }
    listenToLogin() {
        this.userSession
        .getSessionKey$(UserSessionKeys.CurrentUser)
        .subscribe(res=>{
            if(res.name==UserSessionKeys.CurrentUser){
                this.isLogin = this.authSer.isLogin();
        if (this.isLogin) {
            this.getManagedUser$();
        }
            }
        });

    }

    loadScript(){
        this._script.load('body', 'assets/vendors/froala_editor/js/froala_editor.pkgd.min.js'
                                , 'assets/vendors/froala_editor/js/froala_editor.min.js')
        .then(result => {
            Helpers.setLoading(false);
            // optional js to be loaded once
            // this._script.load('head', 'assets/vendors/custom/fullcalendar/fullcalendar.bundle.js');
        });

    }
    ngAfterViewInit() {
    }

    getManagedUser$() {
        this.userSession
            .getSessionKey$(User_Session_Keys.Managed_User)
            // .takeUntil(this.ngUnsubscribe)
            .subscribe(res => {
                if (res.name == User_Session_Keys.Managed_User) {
                    // this.currentManagedUser = res.value;
                    this.authSer.PrivilegeKeys = res.value;
                }
            })
    }
}



