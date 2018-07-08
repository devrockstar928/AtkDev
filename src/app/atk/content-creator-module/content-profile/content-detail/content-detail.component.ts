import { Subject } from 'rxjs/Subject';
import { UserSessionService } from './../../../services/app-user-session.service';
import { AuthenticationService } from './../../../../auth/_services/authentication.service';
import { Component, OnInit, Inject, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Content, User_Session_Keys } from '../../../model/interface';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.css']
})
export class ContentDetailComponent implements OnInit, OnDestroy {
  post = <Content>{};
  @Input() set Post(value) {
    if (value) {
      this.post = value;
    }
  }
  @Output() onCloseAndRoute = new EventEmitter<any>();
  userPrivilegs = {};

  private ngUnsubscribe = new Subject<false>(); // for unscubscribe any observer before destroy component
  constructor(private authSer: AuthenticationService,
    private userSession: UserSessionService) {
    // this.post = data.post;
  }

  ngOnInit() {
    this.userPrivilegs = this.authSer.PrivilegeKeys;
    this.getManagedUser$();
  }

  getManagedUser$() {
    this.userSession
      .getSessionKey$(User_Session_Keys.Managed_User_Change)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        if (res.name == User_Session_Keys.Managed_User_Change) {
          this.userPrivilegs = this.authSer.PrivilegeKeys;
        }
      })
  }
  closeAndRoute(event) {
    this.onCloseAndRoute.emit(this.post);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
