import { ServerHttpService } from './../../../services/server-http.service';
import { AuthenticationService } from './../../../../auth/_services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MockUsingService } from '../../../../server-data/mock-using.service';
import * as faker from 'faker';
import { UserSessionService } from '../../../services/app-user-session.service';

@Component({
  selector: 'app-content-profile',
  templateUrl: './content-profile.component.html',
  styleUrls: ['./content-profile.component.css']
})
export class ContentProfileComponent implements OnInit {
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

