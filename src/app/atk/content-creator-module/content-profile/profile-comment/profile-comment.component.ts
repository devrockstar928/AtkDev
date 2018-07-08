import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AuthenticationService } from './../../../../auth/_services/authentication.service';
import { ServerHttpService } from '../../../services/server-http.service';
import { profileComment } from '../../../model/interface';

@Component({
  selector: 'app-profile-comment',
  templateUrl: './profile-comment.component.html',
  styleUrls: ['./profile-comment.component.css']
})
export class ProfileCommentComponent implements OnInit, OnDestroy {
  loading = false;
  comments: profileComment[] = [];
  newComment;
  // @Input() set Comments(value) {
  //   if (value) {
  //     this.comments = value;
  //   }
  // }
  constructor(private httpSer: ServerHttpService,
    private authSer: AuthenticationService) { }

  ngOnInit() {
    this.getComments(undefined);
  }

  getComments(page) {
    this.loading = true;
    this.httpSer
      .user_profile_comment(this.authSer.currentUser.id, page)
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
        .user_add_profile_comment({ user_id: this.authSer.currentUser.id, comment: this.newComment } as profileComment)
        .subscribe(res => {
          if (res.type == 'Success') {
          this.comments.push(...res['data']);
          }
        });
    }
  }
  LoadingMore() {
    this.getComments(this.comments[this.comments.length - 1].id);
  }

  ngOnDestroy() {

  }
}
