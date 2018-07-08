import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from './toast.service';


@Injectable()
export class ExceptionService {

    constructor(private _toastService: ToastService, private toastr: ToastrService) { }

    catchBadResponse: (errorResponse: any) => Observable<any> = (errorResponse: any) => {

        const err = <HttpErrorResponse>errorResponse;
        let emsg;
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            emsg = err.error.message;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            if (err.status == 0) {
                // emsg = `Backend returned code ${err.status}, body was: ${err.message}`;
            } else {
                // emsg = `Backend returned code ${err.status}, body was: ${err.error.value}`;
            }
        }
        if (err.status != 404
            && err['error']
            && err['error']['err']
            && err['error']['err']['errors']
            && err['error']['err']['errors'][0]) {
            const errObj = err['error']['err']['errors'][0];
            this.toastr.error(errObj['type'], errObj['message']);
        } else if (err.status != 404 && err['error'] && err['error'].type == 'Error') {
            this.toastr.error(err['error'].code, err['error'].err, {
                positionClass: 'toast-bottom-full-width'
                , timeOut: 8000
                , closeButton: true
            });
        } else {

            // this._toastService.activateRequestError(emsg);
        }

        // return Observable.throw(emsg); // TODO: We should NOT swallow error here.
        return Observable.of();
    }
}


interface ErrorType {
    code: string
    err: string
    type: string
}
