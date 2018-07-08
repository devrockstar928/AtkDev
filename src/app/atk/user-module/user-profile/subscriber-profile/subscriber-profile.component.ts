import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../auth/_services';
import { UserSessionService } from '../../../services/app-user-session.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subscriber-profile',
  templateUrl: './subscriber-profile.component.html',
  styleUrls: ['./subscriber-profile.component.css']
})
export class SubscriberProfileComponent implements OnInit {

  showvlaue = 'Profile';
  userCard;
  comments = [];
  userType;
  constructor(private authSer: AuthenticationService,
    private userSession: UserSessionService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.userType = this.authSer.CurrentUserType;
    // this.getContentProfile(0);
    // this.userCard = this.getFakeProfile(0);
    this.listenToUserId();
  }

  listenToUserId() {
    this.route.params.subscribe(parm => {
      this.userCard = this.userSession.getSessionKey('user');
    });
  }

  hideshowArea(value) {
    this.showvlaue = value;
  }

}
