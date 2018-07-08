import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerHttpService } from '../../../services/server-http.service';
import { User, XpObject } from '../../../model/interface';

@Component({
  selector: 'app-subscriber-profile-data',
  templateUrl: './subscriber-profile-data.component.html',
  styleUrls: ['./subscriber-profile-data.component.css']
})
export class SubscriberProfileDataComponent implements OnInit {
  currentUser: User;
  userXpObject:XpObject;
  constructor(private route: ActivatedRoute,
    private httpSer: ServerHttpService) { }

  ngOnInit() {

    this.route.params.subscribe(parm => {
      if (+parm['id'] > 0) {
        this.getUserProfile(+parm['id']);
      }
    });
  }

  getUserProfile(userid) {
    this.httpSer.get_use_profile(userid).subscribe(res => {

      if (res['result']) {
        this.currentUser = res['result'];
      }
      if (res['xpObject']) {
        this.userXpObject = res['xpObject'];
      }
    });
  }


}
