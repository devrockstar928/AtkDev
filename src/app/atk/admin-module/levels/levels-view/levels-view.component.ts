import { Level } from './../../../model/interface';
import { AuthenticationService } from './../../../../auth/_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSessionService } from './../../../services/app-user-session.service';
import { ToastrService } from 'ngx-toastr';
import { ServerHttpService } from './../../../services/server-http.service';
import { Subject } from 'rxjs/Subject';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-levels-view',
  templateUrl: './levels-view.component.html',
  styleUrls: ['./levels-view.component.css']
})
export class LevelsViewComponent implements OnInit , OnDestroy {

  level: Level;
  currentMode;
  levelForm: FormGroup;
  private ngUnsubscribe = new Subject<void>(); // for unscubscribe any observer before destroy component
  constructor(private fb: FormBuilder,
    private mainSer: ServerHttpService,
    private toastr: ToastrService,
    private userSession: UserSessionService,
    private route: ActivatedRoute,
    private router: Router,
    private authSer: AuthenticationService) { }

  ngOnInit() {
    this.levelForm = this.createTierForm();

    this.route.params.subscribe(parm => {
      if (+parm['id'] > 0) {
        this.currentMode = 2;
        this.levelForm.patchValue(this.userSession.getSessionKey('level'));

      } else {
        this.currentMode = 1;
        this.levelForm.reset();
      }
    });
  }
  generateArray(obj) {
    return Object.keys(obj).map(key => obj[key]);
  }

  createTierForm() {
    return this.fb.group({
      id: ['', [Validators.required]],
      level_value: ['', [Validators.required, Validators.max(200)]],
      xp_value: ['', [Validators.required]],
    });

  }


  AddNewLevel(event) {
    const level = this.levelForm.value;
    if (this.currentMode == 1) {
      this.mainSer
        .addLevel(level)
        .takeUntil(this.ngUnsubscribe)
        .subscribe(res => {
          this.actionAfterSave(res);
        });
    } else if (this.currentMode == 2) {
      this.mainSer
        .editLevel(level.id, level)
        .takeUntil(this.ngUnsubscribe)
        .subscribe(res => {
          this.actionAfterSave(res);
        });
    }
  }

  actionAfterSave(res) {
    if (res.type == 'Success') {
      this.toastr.success('', 'saved success');

      this.levelForm.reset();
      this.router.navigate(['/admin/levels/all']);
    } else if (res.type == 'Error') {
      const err = res.err;
      this.toastr.error(err.errors[0].type, err.errors[0].message);

    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
