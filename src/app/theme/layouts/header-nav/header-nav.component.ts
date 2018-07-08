import { Subject } from 'rxjs/Subject';
import { AuthenticationService } from './../../../auth/_services/authentication.service';
import { UserSessionService } from './../../../atk/services/app-user-session.service';
import { ServerHttpService } from './../../../atk/services/server-http.service';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Helpers } from '../../../helpers';
import { Type_Of_Account, Privilege, User_Session_Keys, User } from '../../../atk/model/interface';
import { MatSelectChange } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

declare let mLayout: any;
@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit, OnDestroy {
    ccList$: Observable<User[]>;
    ccList: User[] = [];
    ccField: FormControl = new FormControl();
    
    currentUserType;
    associations: Privilege[] = [];
    users: User[] = [];
    @Output() onSelectUser = new EventEmitter<Privilege>();
    currentUser: Privilege;
    private ngUnsubscribe = new Subject<void>(); // for unscubscribe any observer before destroy component
    constructor(private httpSer: ServerHttpService
        , private authSer: AuthenticationService
        , private router: Router
        , private usreSession: UserSessionService) {

    }
    
    ngOnInit() {
        this.currentUserType = this.authSer.CurrentUserType;
        if (this.currentUserType == Type_Of_Account.CreatorManager) {
            this.getUsersAssocioatns();
        } else if (this.currentUserType == Type_Of_Account.Admin) {
            this.getUsersAssocioatns('cc');
            // this.getCCList();
        }
    }

    getUsersAssocioatns(type?) {
        this.httpSer
            .getUserAssociations(type)
            .takeUntil(this.ngUnsubscribe)
            .subscribe(res => {
                console.log(res);
                if (res.type == 'Success') {
                    this.ccList = res['data'];
                    this.ccList.map(cc => cc.fullName = `${cc.first_name} ${cc.last_name}`);
                    this.makeCCObservable$();
                    
                    this.associations = res['data'];
                    if (this.associations.length > 0) {
                        this.currentUser = this.associations[0];
                        this.usreSession.setSessionKey(User_Session_Keys.Managed_User, this.currentUser);
                    }
                }
            })
    }
    ngAfterViewInit() {

        mLayout.initHeader();

    }

 //#region cc area

 getCCList() {
    this.httpSer
      .getUserslist(Type_Of_Account.CreatorContent)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        if (res['type'] == 'Success') {
          this.ccList = res['data'];
          this.ccList.map(cc => cc.fullName = `${cc.first_name} ${cc.last_name}`);
          this.makeCCObservable$();
        }
      });
  }

  makeCCObservable$() {
    this.ccList$ = this.ccField.valueChanges
      .startWith('')
      .map(name => name ? this.filterCCList(name) : this.ccList.slice()
      );
  }

  filterCCList(value: string) {
    return typeof value === 'string' ? this.ccList.filter(cc =>
      cc.fullName ? cc.fullName.toLowerCase().indexOf(value.toLowerCase()) === 0 : -1) : [];
  }

  displayFn(user: User): string | undefined {
    return user ? user.fullName : undefined;
  }

  selectContentCreator(user) {
    this.usreSession.setSessionKey(User_Session_Keys.Managed_User, this.ccField.value);
    this.router.navigateByUrl('/dashboard');
    // this.onSelectUser.emit(user);
}
  //#endregion

    selectUser(selectChange: MatSelectChange) {
        this.usreSession.setSessionKey(User_Session_Keys.Managed_User, selectChange.value);
        this.router.navigateByUrl('/dashboard');
        // this.onSelectUser.emit(user);
    }
    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}