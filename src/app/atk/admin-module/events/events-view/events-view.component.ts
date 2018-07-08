import { Subject } from 'rxjs/Subject';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServerHttpService } from '../../../services/server-http.service';
import { ToastrService } from 'ngx-toastr';
import { UserSessionService } from '../../../services/app-user-session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../../auth/_services/authentication.service';

@Component({
  selector: 'app-events-view',
  templateUrl: './events-view.component.html',
  styleUrls: ['./events-view.component.css']
})
export class EventsViewComponent implements OnInit , OnDestroy{


  event: Event;
  currentMode;
  eventForm: FormGroup;
  private ngUnsubscribe = new Subject<void>(); // for unscubscribe any observer before destroy component
  constructor(private fb: FormBuilder,
    private mainSer: ServerHttpService,
    private toastr: ToastrService,
    private userSession: UserSessionService,
    private route: ActivatedRoute,
    private router: Router,
    private authSer: AuthenticationService) { }

  ngOnInit() {
    this.eventForm = this.createTierForm();

    this.route.params.subscribe(parm => {
      if (+parm['id'] > 0) {
        this.currentMode = 2;
        this.eventForm.patchValue(this.userSession.getSessionKey('event'));
      } else {
        this.currentMode = 1;
        this.eventForm.reset();
      }
    });
  }
  generateArray(obj) {
    return Object.keys(obj).map(key => obj[key]);
  }

  createTierForm() {
    return this.fb.group({
      id: undefined,
      event_name: ['', [Validators.required, Validators.max(200)]],
      event_value: ['', [Validators.required]],
      event_active: ['', [Validators.required]],
      event_frequency_times: ['', [Validators.required]],
      event_frequency_unit: ['', [Validators.required]]
    });

  }


  AddNewEvent(event) {
    const level = this.eventForm.value;
    if (this.currentMode == 1) {
      this.mainSer
        .addEvent(level)
    .takeUntil(this.ngUnsubscribe)
    .subscribe(res => {
          this.actionAfterSave(res);
        });
    } else if (this.currentMode == 2) {
      this.mainSer
        .editEvent(level.id, level)
    .takeUntil(this.ngUnsubscribe)
    .subscribe(res => {
          this.actionAfterSave(res);
        });
    }
  }

  actionAfterSave(res) {
    if (res.type == 'Success') {
      this.toastr.success('', 'saved success');

      this.eventForm.reset();
      this.router.navigate(['/admin/events/all']);
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
