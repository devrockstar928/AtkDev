import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'ngx-toastr';
import { XpObject } from './../../../model/interface';
import { UserSessionKeys } from './../../../shared/user-session-keys';
import { UserSessionService } from './../../../services/app-user-session.service';
import { AuthenticationService } from './../../../../auth/_services/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-user-xp',
  templateUrl: './user-xp.component.html',
  styleUrls: ['./user-xp.component.css']
})
export class UserXpComponent implements OnInit ,OnDestroy {

  xpObject: XpObject;
  private destroy$ = new Subject<false>(); // for unscubscribe any observer before destroy component
  constructor(private authSer: AuthenticationService,
    private userSession: UserSessionService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.xpObject = this.authSer.xpObject;
    this.getUserXPObject$();
  }


  getUserXPObject$() {
    this.userSession
      .getSessionKey$(UserSessionKeys.XpObject)
      .takeUntil(this.destroy$)
      .subscribe(res => {
        this.xpObject = res.value;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(false);
    this.destroy$.complete();
  }

}
