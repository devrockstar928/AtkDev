import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';

import { Type_Of_Account } from './../model/interface';
import { AuthenticationService } from './../../auth/_services/authentication.service';


@Injectable()
export class AdminAuthGuard implements CanActivate {

    constructor(private _router: Router, private _authService: AuthenticationService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

        const userType = this._authService.CurrentUserType;
        if (userType && userType == Type_Of_Account.Admin) {
            for (let i = 0; i < this._router.config.length; i++) {
                const routePath: string = this._router.config[i].path;
            }
            return true;
        }
        this._router.navigate(['/no-access']);
        return false;
    }



}
