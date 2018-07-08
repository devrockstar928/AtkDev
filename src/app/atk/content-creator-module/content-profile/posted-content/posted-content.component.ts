import { Content } from './../../../model/interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerHttpService } from './../../../services/server-http.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ContentDetailComponent } from '../content-detail/content-detail.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, ScrollStrategyOptions, OverlayRef } from '@angular/cdk/overlay';
import * as $ from 'jquery';
import { UserSessionService } from '../../../services/app-user-session.service';

@Component({
  selector: 'app-posted-content',
  templateUrl: './posted-content.component.html',
  styleUrls: ['./posted-content.component.css']
})
export class PostedContentComponent implements OnInit {
  loading = false;
  posts: Content[] = [];
  showedPost;
  userId: number;
  constructor(private httpSer: ServerHttpService,
    private route: ActivatedRoute,
    private router: Router,
    private userSession: UserSessionService,
    private overlay: Overlay,
    private scroll: ScrollStrategyOptions,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe(parm => {
      if (+parm['id'] > 0) {
        this.userId = +parm['id'];
        this.getUserFeed();
      }
    });
  }

  getUserFeed(conentId?) {
    this.loading = true;
    this.httpSer.user_cc_feed(this.userId, conentId).subscribe(res => {
      if (res['msg'] && res['msg']['result']) {
        this.posts.push(...res['msg']['result']);
        this.loading = false;
      }
    });
    // user/cc_feed?cc_id
  }

  loadMoreContent() {
    this.getUserFeed(this.posts[this.posts.length - 1].id);

  }

  onCloseAndRoute(post) {
    // t.modal('hide');
    // (<any>$('#postdetail')).modal('dispose');
    $("#postdetail .close").click()
    // t.classList.remove('show');
    // t.classList.add('hide');
    // // t.classList[2] = 'hid/e';
    // document.getElementsByClassName('modal-backdrop')[0].classList.remove('show')
    // document.getElementsByClassName('modal-backdrop')[0].classList.add('hide')
    this.userSession.setSessionKey('content_post', this.showedPost);
    this.router.navigateByUrl(`/creator/post/${this.showedPost.id}/edit`)
  }

  showPost(post: Content) {
    this.showedPost = post;
    this.router.navigate([], { relativeTo: this.route, queryParams: { id: post.id } });
  }
  // openDialog(row): void {
  //   const overlayRef = this.overlay.create();
  //   // overlayRef.
  //   // overlayRef. = this.scroll;
  //   // const userProfilePortal = new ComponentPortal(PostedContentComponent);
  //   // overlayRef.attach(userProfilePortal);
  //   this.dialog.open(ContentDetailComponent, {
  //     scrollStrategy: {
  //       enable: () => { }, disable: () => { }
  //       , attach: (over: OverlayRef) => { over = overlayRef;  }
  //     },
  //     data: { post: row }
  //   }).afterClosed()
  //     .subscribe(result => {
  //       if (result) {
  //         // this.mainSer.deleteUserTier(row).subscribe(res => {
  //         //   if (res.type == 'Success') {
  //         //     this.toastr.success(row.tier_name, 'delete success');
  //         //     const index = this.tiers.indexOf(row);
  //         //     if (index != -1) {
  //         //       this.tiers.splice(index, 1);
  //         //     }
  //         //     this.dataSource.data = this.tiers;
  //         //   }
  //         // });
  //       }
  //       // this.animal = result;
  //     });
  // }
}
