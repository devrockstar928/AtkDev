import { Subject } from 'rxjs/Subject';
import { ServerHttpService } from './../../services/server-http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
@Component({
    selector: 'app-content-creator-manager-table',
    templateUrl: './content-creator-manager-table.component.html',
    styles: []
})
export class ContentCreatorManagerTableComponent implements OnInit ,OnDestroy {

    contents = [];
    usersInfo = [
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
        {
            id: 1,
            first_name: 'name',
            last_name: 'last name',
            user_name: 'user_name',
        },
    ];
    private ngUnsubscribe = new Subject<void>(); // for unscubscribe any observer before destroy component

    constructor(private adminService: ServerHttpService) { }

    ngOnInit() {
        // this.getUserInfo();
    }
    getUserInfo() {
        this.adminService.getUserInfo()
    .takeUntil(this.ngUnsubscribe)
    .subscribe(res => {
            if (res) {
                this.usersInfo = res['msg'];
            }
        });
    }
    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
      }
}
interface ContentCreatorManager {
    id?: number;
    user_id?: number;
    profile_picture?: number;
    profile_description?: number;
    level?: number;
    revenue?: number;
    trophy?: number;
    content?: number;
    xp?: number;
    city?: number;
    country?: number;
    postal_code?: number;
    line1?: number;
    state?: number;
    first_name?: number;
    last_name?: number;
    user_name?: number;
    type_of_account?: number;
    posts?: number;
    followers?: number;
    following?: number;
}
