import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Comments, Streams } from '../../../model/interface';
import { AuthenticationService } from '../../../../auth/_services';
import { ServerHttpService } from '../../../services/server-http.service';

@Component({
  selector: 'app-subscriber-stream',
  templateUrl: './subscriber-stream.component.html',
  styleUrls: ['./subscriber-stream.component.css']
})
export class SubscriberStreamComponent implements OnInit {

  // filterstreams: Streams = [];
  filtertype = 'all';
  streams: Streams = <Streams>{ likes: [], comments: [], subscribtions: [] };
  userId;
  // @Output() emitComment = new EventEmitter<Comments[]>();
  constructor(private httpSer: ServerHttpService
    , private route: ActivatedRoute
    , private authSer: AuthenticationService) { }

  ngOnInit() {
    // this.getStream();
    this.route.params.subscribe(parm => {
      this.userId = +parm['id'];
      if (this.userId) {
        this.getActivites(this.userId);
      }
    });
  }

  getActivites(userId, paginate = 1) {
    this.httpSer
      .get_user_activities(userId, paginate)
      .subscribe(res => {
        if (res.type == 'Success') {
          this.streams = res['data'];
          // this.emitComment.emit(this.streams.comments);
        }
      });
    this.filer(this.filtertype);
  }

  paginate(event: PageEvent) {
    this.getActivites(event.pageIndex + 1);
  }


  filer(filer) {

    this.filtertype = filer;
  }


}