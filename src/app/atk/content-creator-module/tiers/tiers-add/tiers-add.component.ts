import { TiersHttpService } from './../tiers-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs/Subject';
import { AuthenticationService } from './../../../../auth/_services/authentication.service';
import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { Tier } from '../../../model/interface';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { UserSessionKeys } from '../../../shared/user-session-keys';
import { UserSessionService } from '../../../services/app-user-session.service';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { Helpers } from '../../../../helpers';

@Component({
  selector: 'app-tiers-add',
  templateUrl: './tiers-add.component.html'
})
export class TiersAddComponent implements OnInit ,OnDestroy{

  tier: Tier;
  currentMode;
  tierForm: FormGroup;
  // @Input() set Tier(value: Tier) {
  //   if (value) {
  //     this.currentMode = 2;
  //     // this.tierForm.patchValue(value);
  //     // this.tierForm.get('tier_rewards').setValue(this.generateArray(value.tier_rewards));
  //   } else {
  //     this.currentMode = 1;
  //   }
  // }
  get tier_rewards(): FormArray {
    return <FormArray>this.tierForm.get('tier_rewards');
  }
  private destroy$ = new Subject<false>(); // for unscubscribe any observer before destroy component
  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private userSession: UserSessionService,
    private tierSer: TiersHttpService,
    private route: ActivatedRoute,
    private _script: ScriptLoaderService,
    private router: Router,
    private authSer: AuthenticationService) { }

  ngOnInit() {
    this.tierForm = this.createTierForm();

    this.route.params.subscribe(parm => {
      this.tier = this.userSession.getSessionKey('editTier');
      if (+parm['id'] > 0) {
        this.currentMode = 2;
        this.tierForm.patchValue({ id: this.tier.id });
        this.tierForm.patchValue({ cc_id: this.tier.cc_id });
        this.tierForm.patchValue({ tier_name: this.tier.tier_name });
        this.tierForm.patchValue({ tier_value: this.tier.tier_value });
        // this.tierForm.patchValue({ plan_id: this.tier.plan_id });
        const formGroupTier = this.generateArray(this.tier.tier_rewards).map(re => this.fb.group({ name: re }));
        this.tierForm.setControl('tier_rewards', this.fb.array(formGroupTier));

      } else {
        this.currentMode = 1;
        this.tierForm.reset();
      }

      this.loadScript();
      this.tier_rewards.push(this.fb.group({ name: ['', [Validators.required, Validators.max(40)]] }));
    });
  }
  generateArray(obj) {
    return Object.keys(obj).map(key => obj[key]);
  }
  // tier_rewards?: { 'key': string, 'value': string }[];
  createTierForm() {
    return this.fb.group({
      id: undefined,
      cc_id: this.authSer.getCurrentUser().id,
      tier_name: ['', [Validators.required, Validators.max(40)]],
      tier_value: ['', Validators.compose([Validators.required, this.nonZero])],
      // plan_id: [''],
      tier_rewards: this.fb.array(
        [
        ])
    });

  }

  loadScript() {
    this._script.load('body', 'assets/vendors/froala_editor/js/froala_editor.pkgd.min.js'
      , 'assets/vendors/froala_editor/js/froala_editor.min.js')
      .then(result => {
        Helpers.setLoading(false);
        // optional js to be loaded once
        // this._script.load('head', 'assets/vendors/custom/fullcalendar/fullcalendar.bundle.js');
      });

  }

  nonZero(control): { [key: string]: any; } {
    if (Number(control.value) < 0) {
      return { nonZero: true };
    } else {
      return null;
    }
  }

  AddNewTiers() {
    const tiers = this.tierForm.value;
    let rewards: string;
    rewards = tiers.tier_rewards[0].name;
    if (this.currentMode == 1) {
      this.tierSer
        .addUserTier({
          tiername: tiers.tier_name,
          tiervalue: tiers.tier_value,
          rewards: rewards
        })
        .takeUntil(this.destroy$)
        .subscribe(res => {
          if (res['msg'] == 1 || res['text']['id'] > 0) {
            this.toastr.success(res['test'], 'saved success');

            this.tierForm.reset();
            this.router.navigate(['/creator/tiers']);
          }
        });
    } else if (this.currentMode == 2) {
      this.tierSer
        .editUserTier({
          tierid: this.tier.id,
          tiername: tiers.tier_name,
          tiervalue: tiers.tier_value,
          rewards: rewards
        })
        .takeUntil(this.destroy$)
        .subscribe(res => {
          if (res['msg'] == 1 || res.type == 'Success') {
            this.toastr.success(res['test'], 'saved success');

            this.tierForm.reset();
            this.router.navigate(['/creator/tiers']);
          }
        });
    }
  }


  // //#endregion
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.loadScript();
  }
}
