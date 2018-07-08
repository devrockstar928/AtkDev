import { UserSessionService } from './../atk/services/app-user-session.service';
import { ToastrService } from 'ngx-toastr';
import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScriptLoaderService } from '../_services/script-loader.service';
import { AuthenticationService } from './_services/authentication.service';
import { AlertService } from './_services/alert.service';
import { AlertComponent } from './_directives/alert.component';
import { LoginCustom } from './_helpers/login-custom';
import { Helpers } from '../helpers';
import { User_Session_Keys } from '../atk/model/interface';

@Component({
    selector: 'atk-login-page',
    templateUrl: './templates/login-1.component.html',
    // encapsulation: ViewEncapsulation.None
})

export class AuthComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    @ViewChild('alertSignin', { read: ViewContainerRef }) alertSignin: ViewContainerRef;
    @ViewChild('alertSignup', { read: ViewContainerRef }) alertSignup: ViewContainerRef;
    @ViewChild('alertForgotPass', { read: ViewContainerRef }) alertForgotPass: ViewContainerRef;

    constructor(private _router: Router,
        private _script: ScriptLoaderService,
        private _route: ActivatedRoute,
        private toastr: ToastrService,
        private userSession: UserSessionService,
        private _authService: AuthenticationService,
        private _alertService: AlertService,
        private cfr: ComponentFactoryResolver) {
    }

    ngOnInit() {
        // this.model.remember = true;
        // // get return url from route parameters or default to '/'
        // this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
        // this._router.navigate([this.returnUrl]);

        this._script.load('body', 'assets/vendors/base/vendors.bundle.js', 'assets/demo/default/base/scripts.bundle.js')
            .then(() => {
                Helpers.setLoading(false);
                LoginCustom.init();
            });
    }

    signin() {
        if (!this.model.email) {
            this.toastr.warning('Enter valid email', 'Emial', { positionClass: 'toast-top-full-width', timeOut: 3000 })
            return
        }
        if (!this.model.password) {
            this.toastr.warning('Enter Password', 'Password', { positionClass: 'toast-top-full-width', timeOut: 3000 })
            return
        }
        this.loading = true;
        this._authService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                    if (data['success']) {
                        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '';
                        this._router.navigate([this.returnUrl]);
                        this.loading = false;
                        this.getManagedUser$();
                    } else {
                        this.loading = false;
                    }
                },
                error => {
                    this.showAlert('alertSignin');
                    this._alertService.error('invalid username or password');
                    this.loading = false;
                });
    }
    getManagedUser$() {
        this.userSession
            .getSessionKey$(User_Session_Keys.Managed_User)
            // .takeUntil(this.ngUnsubscribe)
            .subscribe(res => {
                if (res.name == User_Session_Keys.Managed_User) {
                    // this.currentManagedUser = res.value;
                    this._authService.PrivilegeKeys = res.value;
                }
            })
    }
    signup() {
        // this.loading = true;
        // this._userService.create(this.model)
        //     .subscribe(
        //     data => {
        //         this.showAlert('alertSignin');
        //         this._alertService.success('Thank you. To complete your registration please check your email.', true);
        //         this.loading = false;
        //         LoginCustom.displaySignInForm();
        //         this.model = {};
        //     },
        //     error => {
        //         this.showAlert('alertSignup');
        //         this._alertService.error(error);
        //         this.loading = false;
        //     });
    }

    forgotPass() {
        // this.loading = true;
        // this._userService.forgotPassword(this.model.email)
        //     .subscribe(
        //     data => {
        //         this.showAlert('alertSignin');
        //         this._alertService.success('Cool! Password recovery instruction has been sent to your email.', true);
        //         this.loading = false;
        //         LoginCustom.displaySignInForm();
        //         this.model = {};
        //     },
        //     error => {
        //         this.showAlert('alertForgotPass');
        //         this._alertService.error(error);
        //         this.loading = false;
        //     });
    }

    showAlert(target) {
        this[target].clear();
        const factory = this.cfr.resolveComponentFactory(AlertComponent);
        const ref = this[target].createComponent(factory);
        ref.changeDetectorRef.detectChanges();
    }
}
