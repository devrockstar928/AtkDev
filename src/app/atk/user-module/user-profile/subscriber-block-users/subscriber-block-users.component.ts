import { Subject } from 'rxjs/Subject';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserContacts, User_Session_Keys, Type_Of_Account } from '../../../model/interface';
import { ServerHttpService } from '../../../services/server-http.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../../auth/_services';
import { UserSessionService } from '../../../services/app-user-session.service';

@Component({
  selector: 'app-subscriber-block-users',
  templateUrl: './subscriber-block-users.component.html',
  styleUrls: ['./subscriber-block-users.component.css']
})
export class SubscriberBlockUsersComponent implements OnInit , OnDestroy{
  contacts: UserContacts[] = [];
  userPrivilegs = {};

  private ngUnsubscribe = new Subject<false>(); // for unscubscribe any observer before destroy component
  constructor(
    private httpSer: ServerHttpService,
    private toastr: ToastrService,
    private userSession: UserSessionService,
    private authSer: AuthenticationService) { }

  ngOnInit() {
    this.getManagedUser$();
    this.getUserContacts();
  }


  getUserContacts() {
    this.httpSer.user_contacts()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        if (res['success']) {
          this.contacts = res['msg'];
        }
      });
  }

  getManagedUser$() {
    this.userSession
      .getSessionKey$(User_Session_Keys.Managed_User)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        if (res.name == User_Session_Keys.Managed_User) {
          if (this.authSer.CurrentUserType == Type_Of_Account.CreatorManager) {
            this.userPrivilegs = this.authSer.PrivilegeKeys;
          }
          this.getUserContacts();
        }
      })
  }

  changeBlockUser(user: UserContacts) {
    this.httpSer
      .toggle_block_user(user.id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        if (res.success == true) {
          this.getUserContacts();
        }

      })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
