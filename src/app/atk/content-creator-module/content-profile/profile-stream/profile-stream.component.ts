import { AuthenticationService } from './../../../../auth/_services/authentication.service';
import { ServerHttpService } from './../../../services/server-http.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as faker from 'faker';
import { Comments, Likes, Subscribtions, Streams } from '../../../model/interface';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-profile-stream',
  templateUrl: './profile-stream.component.html',
  styleUrls: ['./profile-stream.component.css']
})
export class ProfileStreamComponent implements OnInit {
  // filterstreams: Streams = [];
  filtertype = 'all';
  streams: Streams = <Streams>{};
  @Output() emitComment = new EventEmitter<Comments[]>();
  constructor(private httpSer: ServerHttpService, private authSer: AuthenticationService) { }

  ngOnInit() { 
    // this.getStream();
    this.getActivites();
  }

  getActivites(paginate=1){
    this.httpSer
      .get_user_activities(this.authSer.currentUser.id,paginate)
      .subscribe(res => {
        if (res.type == 'Success') {
          this.streams = res['data'];
          this.emitComment.emit(this.streams.comments);
        }
      });
    this.filer(this.filtertype);
  }

  paginate(event:PageEvent){
this.getActivites(event.pageIndex+1);
  }
  // getStream() {
  //   for (let index = 3; index < 21; index++) {
  //     let c = this.getFakeStream();
  //     if (index % 3 == 0) {
  //       c.type = 'comment';
  //       c.value = `add comment to ${c.value}`;
  //     } else if (index % 3 == 1) {
  //       c.type = 'like';
  //       c.value = `like post ${c.value}`;
  //     } else if (index % 3 == 2) {
  //       c.type = 'subscription';
  //       c.value = `subscription post ${c.value}`;
  //     }
  //     this.streams.push(c);
  //   }
  // }

  filer(filer) {
    // if (filer == 'all') {
    //   this.filterstreams = this.streams;
    // } else if (filer == 'like') {
    //   this.filterstreams = this.streams.comments;
    // } else if (filer == 'comment') {
    //   this.filterstreams = this.streams.likes;
    // } else if (filer == 'subscription') {
    //   this.filterstreams = this.streams.subscribtions;
    // }
    this.filtertype = filer;
  }
  // getFakeStream() {
  //   return {
  //     time: faker.date.past(),
  //     value: faker.name.findName(),
  //     type: faker.database.type()
  //   };
  // }

}


