import { Subject } from 'rxjs/Subject';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ServerHttpService } from '../../../services/server-http.service';
import { ToastrService } from 'ngx-toastr';
import { Sku, Type_Of_Account } from '../../../model/interface';
import { UserSessionService } from '../../../services/app-user-session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../../auth/_services';

@Component({
  selector: 'app-sku-edit',
  templateUrl: './sku-edit.component.html',
  styleUrls: ['./sku-edit.component.css']
})
export class SkuEditComponent implements OnInit, OnDestroy {
  skuUser: Sku;
  currentMode;
  skuForm: FormGroup;
  private ngUnsubscribe = new Subject<void>(); // for unscubscribe any observer before destroy component
  constructor(private fb: FormBuilder,
    private mainSer: ServerHttpService,
    private toastr: ToastrService,
    private userSession: UserSessionService,
    private route: ActivatedRoute,
    private router: Router,
    private authSer: AuthenticationService) { }

  ngOnInit() {
    this.skuForm = this.createSkuForm();

    this.route.params.subscribe(parm => {
      this.skuUser = this.userSession.getSessionKey('editsku');
      if (+parm['id'] > 0) {
        this.currentMode = 2;
        this.skuForm.patchValue(this.skuUser);
      } else {
        this.currentMode = 1;
        this.skuForm.reset();
      }
    });
  }

  createSkuForm() {
    return this.fb.group({
      id: undefined,
      product_type: ['', [Validators.required]],
      size: ['', [Validators.required]],
      is_signed: [''],
      price: ['', [Validators.required]],
      cc_id: [''],
      product_id: [''],
      sku_id: [''],
    });
  }


  AddNewSku() {
    const sku: Sku = this.skuForm.value;
    let obj = sku
    if (this.authSer.CurrentUserType == Type_Of_Account.CreatorContent) {
      obj = {};
      obj['is_signed'] = sku.is_signed;
      obj['price'] = sku.price;
      obj['product_type'] = sku.product_type;
      obj['size'] = sku.size;
    }
    if (this.currentMode == 1) {
      this.mainSer
        .cc_add_sku(obj)
        .takeUntil(this.ngUnsubscribe)
        .subscribe(res => {
          if (res['msg'] == 1 || res.success == true) {
            this.toastr.success(res['test'], 'saved success');

            this.skuForm.reset();
            // this.router.navigate(['../../'], { relativeTo: this.route });
          } else if (res.success == false) {
            this.toastr.error('Error', res['msg']['message'], {
              positionClass: 'toast-bottom-full-width'
              , timeOut: 8000
              , closeButton: true
            });
          }
        });
    } else if (this.currentMode == 2) {
      this.mainSer
        .admin_skus_edit(obj)
        .takeUntil(this.ngUnsubscribe)
        .subscribe(res => {
          if (res['msg'] == 1 || res.type == 'Success') {
            this.toastr.success(res['test'], 'saved success');

            // this.skuForm.reset();
            // this.router.navigate(['../../'], { relativeTo: this.route });
          } else {
            this.toastr.error('Error', res['msg']['message'], {
              positionClass: 'toast-bottom-full-width'
              , timeOut: 8000
              , closeButton: true
            });
          }
        });
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
