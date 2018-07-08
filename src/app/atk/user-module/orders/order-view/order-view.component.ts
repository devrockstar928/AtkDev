import { UserSessionService } from './../../../services/app-user-session.service';
import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerHttpService } from './../../../services/server-http.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Orders } from '../../../model/interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit, OnDestroy {

  order: Orders;
  private destroy$ = new Subject<false>(); // for unscubscribe any observer before destroy component


  constructor(private serHttp: ServerHttpService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private userSession: UserSessionService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.route.params.subscribe(parm => {
      this.viewSingleOrder(+parm['id']);
    });
  }


  viewSingleOrder(orderId: number) {
    this.serHttp
      .user_single_order(orderId)
      .takeUntil(this.destroy$)
      .subscribe(res => {
        if (res['msg'] && res['msg'].length > 0) {
          this.order = res['msg'][0];
        }
      });
  }

  backToList() {
    // this.location.back();
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  editOrder() {
    this.userSession.setSessionKey('editorder', this.order);
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  ngOnDestroy() {
    this.destroy$.next(false);
    this.destroy$.complete();
  }

}