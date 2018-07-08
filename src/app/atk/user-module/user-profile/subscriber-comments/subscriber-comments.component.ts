import { Component, OnInit } from '@angular/core';
import { profileComment } from '../../../model/interface';
import { ServerHttpService } from '../../../services/server-http.service';
import { AuthenticationService } from '../../../../auth/_services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subscriber-comments',
  templateUrl: './subscriber-comments.component.html',
  styleUrls: ['./subscriber-comments.component.css']
})
export class SubscriberCommentsComponent implements OnInit {
  loading = false;
  comments: profileComment[] = [];
  newComment;
  userId;
  // @Input() set Comments(value) {
  //   if (value) {
  //     this.comments = value;
  //   }
  // }
  constructor(private httpSer: ServerHttpService
    , private route: ActivatedRoute
    , private authSer: AuthenticationService) { }

  ngOnInit() {
    // this.getStream();
    this.route.params.subscribe(parm => {
      this.userId = +parm['id'];
      if (this.userId) {
        this.getComments(this.userId);
      }
    });
  }

  getComments(userId, paginate?) {
    this.loading = true;
    this.httpSer
      .user_profile_comment(userId, paginate)
      .subscribe(res => {
        this.loading = false;
        if (res.type = 'Success') {
          this.comments.push(...res['data']);
        }
      });
  }

  addNewComment() {
    if (this.newComment) {

      this.httpSer
        .user_add_profile_comment({ user_id: this.userId, comment: this.newComment } as profileComment)
        .subscribe(res => {
          if (res.type == 'Success') {
          this.comments.push(...res['data']);
          }
        });
    }
  }
  LoadingMore() {
    this.getComments(this.userId, this.comments[this.comments.length - 1].id);
  }

  ngOnDestroy() {

  }
}
