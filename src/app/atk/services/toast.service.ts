import { Injectable } from '@angular/core';
//import { AlertsService, AlertSettings } from '../ui-component/ng2-alerts/JasperoAlertsModule';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class ToastService {
    constructor(
        private toastr: ToastrService
    ) { }
    public activate(message?: string, title?: string, messageType?: number): void { }
    // ****************************************************************
    public activateMsg(message?: string) {
        // this.translate.get(message).subscribe(
        //     msg => {
        //         this.toastr.error("",msg, { closeButton: true });
        //         //this.activate(msg);
        //     });

    }
    public activateRequestError(message?: string) {
        this.toastr.error(message, "", { closeButton: true, timeOut: 10000, tapToDismiss: false });
    }
    /** *********************************************************
    * return true if msgId = 5
    * else return continue flag {true , false}
    */
    public HandelDbMessages(messages?: Message[]): boolean {

        if (messages && messages.length > 0) {
            let messageType = messages[0].msgID == 5 ? 1 : 2;
            if (messageType == 1) {
                // if (this.translate.currentLang == 'en')
                this.toastr.success(messages[0].msgHeaderEn, messages[0].msgBodyEn, { closeButton: true });

                // if (this.translate.currentLang == 'ar')
                this.toastr.success(messages[0].msgHeaderAr, messages[0].msgBodyAr, { closeButton: true });
            } else {
                if (messages[0].msgID !== 5) {
                    // this.toastr.error(this.translate.currentLang == 'ar' ? messages[0].msgHeaderAr : messages[0].msgHeaderEn,
                    // this.translate.currentLang == 'ar' ? messages[0].msgBodyAr : messages[0].msgBodyEn, { closeButton: true, extendedTimeOut: 100000, positionClass: 'toast-top-center' });

                }


            }
            return (messages[0].msgID == 5 ? true : false);
        } else
            return true;
    }
}

export class Message {
    msgID: number;
    msgHeaderAr: string;
    msgHeaderEn: string;
    msgBodyAr: string;
    msgBodyEn: string;
}
