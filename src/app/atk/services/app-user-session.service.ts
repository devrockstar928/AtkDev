import { Subject } from 'rxjs/Subject';

import { Injectable } from '@angular/core';

interface GeneralObject {
    name: string;
    value: any;
    keys: any;
    from?: any;
    to?: any;
}

interface Subjectkeyval {
    subkey: string;
    subjectObj: Subject<any>;

}

@Injectable()
export class UserSessionService {


    private userSessionKeys: any = {};
    // private userSessionKeys$ = new Subject<any>();
    private subjectsarr: Subjectkeyval[];


    constructor() {
        this.subjectsarr = [];
    }

    setSessionKey(key: string, value: any, propagateChanges?: boolean) {
        if (propagateChanges == undefined) {
            propagateChanges = true;
        }
        const x$ = (this.subjectsarr.find(a => a.subkey == key));
        if (x$ == undefined) {
            this.subjectsarr.push({ subkey: key, subjectObj: new Subject<any>() });
        }

        this.userSessionKeys[key] = { name: key, value: value, keys: {}, propagateChanges: propagateChanges } as GeneralObject;
        const dd$ = (this.subjectsarr.find(a => a.subkey == key));
        dd$.subjectObj.next(this.userSessionKeys[key]);
    }

    updateSessionKey(key: string, property: any, value: any, propagateChanges?: boolean) {
        if (propagateChanges == undefined) {
            propagateChanges = true;
        }
        if (this.userSessionKeys[key]) {
            this.userSessionKeys[key].value[property] = value;
        }

        if (propagateChanges) {
            const dd$ = (this.subjectsarr.find(a => a.subkey == key));
            dd$.subjectObj.next(this.userSessionKeys[key]);
        }
    }

    getSessionKey$(key: string) {
        let dd$ = (this.subjectsarr.find(a => a.subkey == key));
        if (dd$) {
            return dd$.subjectObj.asObservable();
        } else {
            dd$ = {
                subkey: key, subjectObj: new Subject<any>()
            }
            this.subjectsarr.push(dd$);
            return dd$.subjectObj.asObservable();
        }
    }

    /************************************************************************************************/
    getSessionKey<T>(key: string): T {

        const temp = key.split('.');
        let elem = null;
        if (temp.length > 1) {
            if (this.userSessionKeys[temp[0]]) {
                const temp0 = this.userSessionKeys[temp[0]].keys;
                if (temp0[temp[1]]) {
                    elem = temp0[temp[1]].value;
                }
            }
        } else {
            if (this.userSessionKeys[temp[0]]) {
                elem = this.userSessionKeys[temp[0]].value;
            }
        }
        return elem;
    }
    /************************************************************************************************/
    removeSessionKey<T>(key: string, parent?: string) {

        if (parent && this.userSessionKeys[parent]) {
            delete this.userSessionKeys[parent][key];
        } else {
            delete this.userSessionKeys[key];
        }

    }

}



