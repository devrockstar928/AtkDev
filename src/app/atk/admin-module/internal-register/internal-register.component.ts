import { Subject } from 'rxjs/Subject';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ServerHttpService } from '../../services/server-http.service';

@Component({
  selector: 'app-internal-register',
  templateUrl: './internal-register.component.html',
  styleUrls: ['./internal-register.component.css']
})
export class InternalRegisterComponent implements OnInit, OnDestroy {

  regForm: FormGroup;
  private ngUnsubscribe = new Subject<void>(); // for unscubscribe any observer before destroy component
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private httpSer: ServerHttpService) { }

  ngOnInit() {
    this.createFormGroup();
  }


  createFormGroup() {
    this.regForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      user_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
  }


  addUser(event) {
    if (this.regForm.valid) {
      this.httpSer.addInternalUser(this.regForm.value)
        .takeUntil(this.ngUnsubscribe)
        .subscribe(res => {
          console.log(res);
          if (res.type == 'Success') {
            this.toastr.success(res['data'], 'User Singed Up')
            this.regForm.reset();
          } else {
            this.toastr.error(`${res.msg} == > ${res.value}`, res.param, { positionClass: 'toast-bottom-full-width', timeOut: 5000 });
          }
        });
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
