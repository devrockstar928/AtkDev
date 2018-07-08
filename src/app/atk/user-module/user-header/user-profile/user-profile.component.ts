import { Subject } from 'rxjs/Subject';
import { User } from './../../../model/interface';
import { UserSessionService } from './../../../services/app-user-session.service';
import { AuthenticationService } from './../../../../auth/_services/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserSessionKeys } from '../../../shared/user-session-keys';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  currentUser: User;
  private destroy$ = new Subject<false>(); // for unscubscribe any observer before destroy component
  constructor(private authSer: AuthenticationService,
    private userSession: UserSessionService) { }

  ngOnInit() {
    this.currentUser = this.authSer.getCurrentUser();
    this.getCurrentUser$();
  }

  getCurrentUser$() {
    this.userSession
      .getSessionKey$(UserSessionKeys.CurrentUser)
      .takeUntil(this.destroy$)
      .subscribe(res => {
        this.currentUser = res;
      });
  }
  ngOnDestroy() {
    this.destroy$.next(false);
    this.destroy$.complete();
  }
}
