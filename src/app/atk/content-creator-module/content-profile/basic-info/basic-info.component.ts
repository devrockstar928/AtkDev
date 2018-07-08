import { Router } from '@angular/router';
import { UserSessionService } from './../../../services/app-user-session.service';
import { User, XpObject } from './../../../model/interface';
import { Component, OnInit, Input } from '@angular/core';
import { ContentCreator } from '../../../model/interface';
import { ActivatedRoute } from '@angular/router';
import { ServerHttpService } from '../../../services/server-http.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {

  currentUser: User;
  userXpObject:XpObject;
  // @Input() ShowActions = true;
  @Input() set UserCard(value) {
    if (value) {
      this.currentUser = value;
    }
  }
  constructor(private route: ActivatedRoute,
    private router: Router,
    private httpser: ServerHttpService,
    private userSession: UserSessionService) { }

  ngOnInit() {
    // this.listenToUserId();
    this.getUserProfile();
  }

  getUserProfile() {
    this.httpser.get_use_profile().subscribe(res => {
      if (res['result']) {
        this.currentUser = res['result'];
      }
      if (res['xpObject']) {
        this.userXpObject = res['xpObject'];
      }
      
    });
  }
  listenToUserId() {
    this.route.params.subscribe(parm => {
      // this.currentUser = this.getFakeProfile(+parm);
    });
  }

  editProfile() {
    this.userSession.setSessionKey('editProfile', this.currentUser);
    this.router.navigate(['../../', this.currentUser.id, 'edit'], { relativeTo: this.route });
  }
}