import { Content, XpObject, UserLogin, User_Session_Keys } from './../../model/interface';
import { ServerHttpService } from './../../services/server-http.service';
import { Subject } from 'rxjs/Subject';
import { AuthenticationService } from './../../../auth/_services/authentication.service';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserSessionService } from '../../services/app-user-session.service';
import { UserSessionKeys } from '../../shared/user-session-keys';

@Component({
    selector: 'app-atk-user-feed',
    templateUrl: './user-feed.component.html',
    styleUrls: ['./user-feed.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class UserFeedComponent implements OnInit, OnDestroy {
    loading = true;
    contentFeeds: Content[] = [];
    newComment;
    userid;
    userPrivilegs = {};
    private ngUnsubscribe = new Subject<void>(); // for unscubscribe any observer before destroy component
    constructor(private userSer: ServerHttpService,
        private toastr: ToastrService,
        private userSession: UserSessionService,
        private auth: AuthenticationService) { }

    ngOnInit() {
        this.getUserFeed(0);
        this.userPrivilegs = this.auth.PrivilegeKeys;
        this.getManagedUser$();
        this.userid = this.auth.currentUser.id;
    }

    getUserFeed(id?: number) {
        this.userSer.getUserFeeds(id)
            .takeUntil(this.ngUnsubscribe)
            .subscribe(res => {
                if (res['msg']['result']) {
                    this.contentFeeds.push(...res['msg']['result']);
                    this.loading = false;
                } else if (res['msg']) {
                    this.contentFeeds.push(...res['msg']);
                    this.loading = false;

                }
            });
    }

    getManagedUser$() {
        this.userSession
            .getSessionKey$(User_Session_Keys.Managed_User_Change)
            .takeUntil(this.ngUnsubscribe)
            .subscribe(res => {
                if (res.name == User_Session_Keys.Managed_User_Change) {
                    this.userPrivilegs = this.auth.PrivilegeKeys;
                }
            })
    }

    toggleLike(feed: Content) {
        this.userSer
            .toggle_Like(feed.id)
            .takeUntil(this.ngUnsubscribe)
            .subscribe((res: UserLogin) => {
                if (res['success']) {
                    this.userSession.setSessionKey(UserSessionKeys.XpObject, res['xpObject']);
                    if (!feed.isliked) {
                        this.toastr.success('', 'Wow', {
                            timeOut: 1000,
                            positionClass: 'toast-bottom-right',
                        });
                        this.toastr.success(res.xpObject.currentXP.toString(), 'Your Points ', {
                            timeOut: 2000,
                            positionClass: 'toast-bottom-right',
                        });
                        feed.likescount++;
                    } else {
                        this.toastr.warning(res.xpObject.currentXP.toString(), 'Your Points ', {
                            timeOut: 2000,
                            positionClass: 'toast-bottom-right',
                        });
                        feed.likescount--;
                    }
                    feed.isliked = !feed.isliked;
                    this.auth.xpObject = res['xpObject'];
                }
            });
    }

    post_like(feed) {
        this.userSer
            .post_like(feed.id)
            .takeUntil(this.ngUnsubscribe)
            .subscribe(res => {
            });

    }

    add_comment(feed) {
        feed.isAddComment = feed.isAddComment == true ? false : true;
        if (feed.isAddComment) {
            this.get_post_comment(feed);
        } else {
            feed.hasComment = false;
        }
    }
    get_post_comment(feed) {
        this.userSer
            .get_post_comment(feed.id)
            .takeUntil(this.ngUnsubscribe)
            .subscribe(res => {
                feed.hasComment = true;
                feed.comments = res['msg'];
            });

    }

    add_post_comment(feed) {
        if (this.newComment) {
            this.userSer
                .add_comment(feed.id, this.newComment)
                .takeUntil(this.ngUnsubscribe)
                .subscribe(res => {
                    if (res) {
                        this.newComment = undefined;
                        this.auth.xpObject = res['xpObject'];
                        this.get_post_comment(feed);
                    }
                });
        }
    }

    editComment(value, comment, mode, feed) {
        if (mode == 1) {
            comment.editMode = true;
        } else if (mode == 3) {
            comment.editMode = false;
        } else {
            comment.editMode = false;
            comment.comment = value;
            this.userSer
                .edit_comment(feed.id, value)
                .subscribe(res => {
                    this.toastr.success('comment saved', 'edit');
                });
        }

    }

    //#region
    getNextPage(paginate) {
        const c = this.contentFeeds ? this.contentFeeds[this.contentFeeds.length - 1].id : undefined;
        this.getUserFeed(c);
    }
    LoadingMore() {
        this.loading = true;
        const c = this.contentFeeds ? this.contentFeeds[this.contentFeeds.length - 1].id : undefined;
        this.getUserFeed(c);
    }
    //#endregion
    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
