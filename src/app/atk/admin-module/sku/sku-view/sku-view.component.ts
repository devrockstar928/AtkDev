import { AuthenticationService } from './../../../../auth/_services/authentication.service';
import { UserSessionService } from './../../../services/app-user-session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sku } from './../../../model/interface';
import { Component, OnInit } from '@angular/core';
import { ServerHttpService } from '../../../services/server-http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sku-view',
  templateUrl: './sku-view.component.html',
  styleUrls: ['./sku-view.component.css']
})
export class SkuViewComponent implements OnInit {

  skuUser: Sku;
  currentMode;
  skuForm: FormGroup;
  private destroy$ = new Subject<false>(); // for unscubscribe any observer before destroy component
  constructor(
    private userSession: UserSessionService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(parm => {
      this.skuUser = this.userSession.getSessionKey('editsku');
    });
  }




}
