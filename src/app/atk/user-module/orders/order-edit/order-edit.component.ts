import { UserSessionService } from './../../../services/app-user-session.service';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit } from '@angular/core';
import { Orders } from '../../../model/interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServerHttpService } from '../../../services/server-http.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../../auth/_services';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {


userOrder: Orders;
currentMode;
orderForm: FormGroup;
    private destroy$ = new Subject<false>(); // for unscubscribe any observer before destroy component
constructor(private fb: FormBuilder,
  private mainSer: ServerHttpService,
  private toastr: ToastrService,
  private userSession: UserSessionService,
  private route: ActivatedRoute,
  private router: Router,
  private authSer: AuthenticationService) { }

ngOnInit() {
  this.orderForm = this.createSkuForm();

  this.route.params.subscribe(parm => {
    this.userOrder = this.userSession.getSessionKey('editorder');
    if (+parm['id'] > 0) {
      this.currentMode = 2;
      this.orderForm.patchValue(this.userOrder);
    } else {
      this.currentMode = 1;
      this.orderForm.reset();
    }
  });
}

createSkuForm() {
  return this.fb.group({
    id: undefined,
    cc_id: [''],
    user_id: [''],
    content_link: [''],
    order_date: [''],
    payment_date: [''],
    shipping_date: [''],
    shipping_status: [''],
    tracking_number: [''],
    shipping_address: [''],
    billing_address: [''],
    price: [''],
    poster_size: [''],
    poster_signed: [''],
    payment_status: [''],
    order_id: [''],
  });
}


AddNewOrder() {
  const order: Orders = this.orderForm.value;

  if (this.currentMode == 1) {
    this.mainSer
      .cc_add_sku(order)
      .takeUntil(this.destroy$)
      .subscribe(res => {
        if (res['msg'] == 1) {
          this.toastr.success(res['test'], 'saved success');

          this.orderForm.reset();
          this.router.navigate(['../../'], { relativeTo: this.route });
        }
      });
  } else if (this.currentMode == 2) {
    this.mainSer
      .edit_order(order)
      .takeUntil(this.destroy$)
      .subscribe(res => {
        if (res['msg'] == 1 || res.type == 'Success') {
          this.toastr.success(res['test'], 'saved success');

          this.orderForm.reset();
          this.router.navigate(['../../'], { relativeTo: this.route });
        }
      });
  }
}
}
