import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { ExceptionService } from './exception.service';

import { Helpers } from '../../helpers';
import { ToastService } from './toast.service';

@Injectable()
export class HttpGeneralService {
    constructor(private _http: HttpClient,
        private _exceptionService: ExceptionService,
        private toastr: ToastrService,
        private toastService: ToastService) {
    }
    /** *********************************************************
     * used to send get request to sever, take whole url
     * @param url
     */
    get<T>(url: string) {
        // Helpers.setLoading(true);
        Helpers.setLoading(true);
        const headers = createAuthorizationHeader();
        return this._http.get(url, { headers: headers })
            .map(response => {
                const temp = response;
                // if (temp && temp['msg']) {
                const returnFlag = this.toastService.HandelDbMessages(temp['msgData']);
                temp['returnFlag'] = returnFlag;
                // }
                return temp;
            })
            .catch(this._exceptionService.catchBadResponse)
            .finally(
                () => Helpers.setLoading(false)
                // () => Helpers.setLoading(false)
            );
    }
    /** ********************************************************* */
    post<T>(newEntity: T, url: string) {
        const body = JSON.stringify(newEntity);
        const headers = createAuthorizationHeader();
        Helpers.setLoading(true);

        return this._http
            .post(`${url}`, body, { headers: headers })
            .map(response => {
                const temp = response;
                // if (temp && temp['msgData']) {
                const returnFlag = this.toastService.HandelDbMessages(temp['msgData']);
                temp['returnFlag'] = returnFlag;
                // }
                return temp;
            })
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => Helpers.setLoading(false));
    }
    /** ********************************************************* */
    postFormData<T>(newEntity: T, url: string) {

        const headers = new Headers({
            'Authorization': `JWT ${JSON.parse(sessionStorage.getItem('token'))}`,
          });
          let options = {};
          options['headers'] = headers;
          options['method'] = 'POST';
          options['body'] = newEntity;
          const request = new Request(url, options);
          return fetch(request);

        // Helpers.setLoading(true);

        // return this._http
        //     .post(`${url}`, newEntity, { headers: headers })
        //     .map(response => {
        //         const temp = response;
        //         // if (temp && temp['msgData']) {
        //         const returnFlag = this.toastService.HandelDbMessages(temp['msgData']);
        //         temp['returnFlag'] = returnFlag;
        //         // }
        //         return temp;
        //     })
        //     .catch(this._exceptionService.catchBadResponse)
        //     .finally(() => Helpers.setLoading(false));
    }
    /* *****************************************************************/
    put<T>(oldEntity: T, url: string) {
        const body = JSON.stringify(oldEntity);
        const headers = createAuthorizationHeader();
        Helpers.setLoading(true);

        return this._http
            .put(`${url}`, body, { headers: headers })
            .map(response => {
                const temp = response;
                // if (temp && temp['msgData']) {
                const returnFlag = this.toastService.HandelDbMessages(temp['msgData']);
                temp['returnFlag'] = returnFlag;
                // }

                return temp;
            })
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => Helpers.setLoading(false));
    }
    /* *********************************************** */
    delete<T>(url: string) {
        const headers = createAuthorizationHeader();
        // const body = JSON.stringify(entity);
        Helpers.setLoading(true);
        return this._http.delete(url, { headers: headers })
            .map(response => {
                const temp = response;
                // if (temp && temp['msgData']) {
                const returnFlag = this.toastService.HandelDbMessages(temp['msgData']);
                temp['returnFlag'] = returnFlag;
                // }

                return temp;
            })
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => Helpers.setLoading(false));
    }

    /** **********************************************************/
    uploadImage(image, url: string, mimeType: string) {
        // const body = JSON.stringify(image);
        const headers = createAuthorizationHeader();
        Helpers.setLoading(true);
        // const file: File = image[0].file;
        const formData: FormData = new FormData();
        formData.append('uploadFile', image['userPhoto']);
        return this._http
            .post(`${url}`, image, { headers: headers })
            .map(response => response)
            .catch(this._exceptionService.catchBadResponse)
            .finally(() => Helpers.setLoading(false));
    }

    // ******************************************************************************************************************* */
    // ******** user login logout register area *********/
    // login
    httpLogin<T>(newEntity: T, url: string) {
        const body = JSON.stringify(newEntity);

        Helpers.setLoading(true);

        return this._http
            .post(`${url}`, body, {
                headers: {
                    'Content-Type': 'application/json', 'Authorization': ''
                }
            })
            .map(response => {
                const temp = response;
                // if (temp && temp['msgData']) {
                temp['isData'] = true;
                // }
                return temp;
            })
            // .catch(this._exceptionService.catchBadResponse)
            .finally(() => Helpers.setLoading(false));
    }
}

function createAuthorizationHeader() {
    const token = JSON.parse(sessionStorage.getItem('token'));
    const auth = `JWT ${token}`;

    // let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const headers = {
        'Content-Type': 'application/json', 'Authorization': auth
    };
    return headers;
}
