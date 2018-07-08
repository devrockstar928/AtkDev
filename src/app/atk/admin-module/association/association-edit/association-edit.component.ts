import { AuthenticationService } from './../../../../auth/_services/authentication.service';
import { Subject } from 'rxjs/Subject';
import { UserSessionService } from './../../../services/app-user-session.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServerHttpService } from './../../../services/server-http.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Type_Of_Account, User, Privilege_type, Privilege, User_Session_Keys } from './../../../model/interface';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operator/startWith';
import { map } from 'rxjs/operator/map';

@Component({
  selector: 'app-association-edit',
  templateUrl: './association-edit.component.html',
  styleUrls: ['./association-edit.component.css']
})
export class AssociationEditComponent implements OnInit, OnDestroy {
  ccList$: Observable<User[]>;
  ccmList$: Observable<User[]>;

  currentMode = 1;
  currentObject = <Privilege>{};

  associationForm: FormGroup;
  ccList: User[] = [];
  ccmList: User[] = [];
  privilege_types: { value: number; key: string; }[] = [];
  private ngUnsubscribe = new Subject<void>(); // for unscubscribe any observer before destroy component

  constructor(private httpSer: ServerHttpService,
    private toastr: ToastrService,
    private authSer: AuthenticationService,
    private userSession: UserSessionService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createFormGroup();
    this.getCCList();
    this.getCCMList();
    this.getIdFromroute();
    this.setPrivilegeType();
  }

  //#region associations area

  getIdFromroute() {
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(parm => {
        let id = +parm['id'];
        if (id && id > 0) {
          const c = this.userSession.getSessionKey<any>(User_Session_Keys.Association);
          if (c) {
            this.currentObject = c;
            // this.currentObject.association_id = c.id;
            this.setCurrentToForm();
          } else {
            this.getAllAssociations(id);
          }
          this.currentMode = 2;
        } else {
          this.currentMode = 1;
        }
      });
  }

  getAllAssociations(id) {
    this.httpSer.getAssociation(id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        if (res.type == 'Success') {
          this.currentObject = res.data;
          // this.currentObject.association_id = res.data.id;
          this.setCurrentToForm();
        }
      });
  }

  createFormGroup() {
    this.associationForm = this.fb.group({
      id: [''],
      cc_id: [''],
      cc_users: ['', [Validators.required]],
      ccm_id: [''],
      ccm_users: ['', [Validators.required]],
      privileges: [],
      posts: ['', [Validators.required]],
      comments: ['', [Validators.required]],
      likes: ['', [Validators.required]],
      tiers: ['', [Validators.required]],
      skus: ['', [Validators.required]],
      orders: ['', [Validators.required]],
      reports: ['', [Validators.required]],
      get_subscribers: ['', [Validators.required]],
      block_users: ['', [Validators.required]],
      chat_messages: ['', [Validators.required]],
    });
  }

  setCurrentToForm() {
    this.associationForm.patchValue(this.currentObject);
    if (this.currentObject && this.currentObject.privileges) {
      this.associationForm.patchValue(this.currentObject.privileges);
    }
  }

  getTextColor(value: number): string {
    let textcolor = '';
    switch (value) {
      case 0: textcolor = ''; break; // none
      case 1: textcolor = 'text-secondary'; break; // read
      case 2: textcolor = 'text-primary'; break; // update
      case 3: textcolor = 'text-success'; break; // create
      case 4: textcolor = 'text-danger'; break; // delete

      default:
        break;
    }
    return textcolor;

  }

  //#endregion

  //#region  privileges type and displayfn

  setPrivilegeType() {
    const values = Object.keys(Privilege_type).map(key => Privilege_type[key]).filter(value => typeof value === 'number') as string[];
    for (let type in values) {
      this.privilege_types.push({ key: Privilege_type[type], value: parseInt(type) });
    }
  }

  displayFn(user: User): string | undefined {
    return user ? user.fullName : undefined;
  }
  //#endregion

  //#region ccm area

  getCCMList() {
    this.httpSer
      .getUserslist(Type_Of_Account.CreatorManager)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        if (res['type'] == 'Success') {
          this.ccmList = res['data']
          this.ccmList.map(ccm => ccm.fullName = `${ccm.first_name} ${ccm.last_name}`);
          this.makeCCMObservable$();
        }
      });
  }

  makeCCMObservable$() {
    this.ccmList$ = this.associationForm.get('ccm_id')
      .valueChanges
      .startWith('')
      .map(name => name ? this.filterCCMList(name) : this.ccmList.slice());
  }

  filterCCMList(value: string) {
    return typeof value === 'string' ? this.ccmList.filter(ccm =>
      ccm.fullName ? ccm.fullName.toLowerCase().indexOf(value.toLowerCase()) === 0 : -1) : [];
  }

  //#endregion


  //#region cc area

  getCCList() {
    this.httpSer
      .getUserslist(Type_Of_Account.CreatorContent)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        if (res['type'] == 'Success') {
          this.ccList = res['data'];
          this.ccList.map(cc => cc.fullName = `${cc.first_name} ${cc.last_name}`);
          this.makeCCObservable$();
        }
      });
  }

  makeCCObservable$() {
    this.ccList$ = this.associationForm.get('cc_id')
      .valueChanges
      .startWith('')
      .map(name => name ? this.filterCCList(name) : this.ccList.slice()
      );
  }

  filterCCList(value: string) {
    return typeof value === 'string' ? this.ccList.filter(cc =>
      cc.fullName ? cc.fullName.toLowerCase().indexOf(value.toLowerCase()) === 0 : -1) : [];
  }

  //#endregion

  saveAssociation(event) {
    if (this.checkIsValidForm()) {
      this.currentObject = this.associationForm.value;

      this.currentObject.cc_id = this.associationForm.get('cc_users').value.id;
      this.currentObject.ccm_id = this.associationForm.get('ccm_users').value.id;
      this.currentObject.admin_id = this.authSer.CurrentUser.id
      // this.currentObject.cc_users = undefined;
      // this.currentObject.ccm_users = undefined;

      if (this.currentMode == 1) {
        this.addAssociationWithPrivilege();
      } else if (this.currentMode == 2) {
        this.addPrivilege();
      }

    }
  }
  addAssociationWithPrivilege() {
    let c = Object.assign(this.currentObject);
    c.cc_users = undefined;
    c.ccm_users = undefined;
    this.httpSer.addAssociationWithPrivileges(c)
      .subscribe(res => {
        if (res.type = 'Success') {
          this.toastr.success('Association Add  Successfully');
          // this.currentObject = undefined;
          // this.currentObject.privileges=res.privilege.data;
          // this.currentObject.id = res.association.data.id;
          // this.currentObject.association_id = res.association.data.id;
          // this.currentObject.cc_id = res.association.cc_id;
          // this.currentObject.ccm_id = res.association.ccm_id;

          // this.associationForm.patchValue(res.association.data);
          // this.associationForm.patchValue(res.privilege.data);
          // this.associationForm.patchValue({cc_users:this.currentObject.cc_users});
          // this.associationForm.patchValue({ccm_users:this.currentObject.ccm_users});

          // this.currentMode = 2;

          this.reset();
          // this.associationForm.reset();
          // this.currentObject = undefined;
        }
      });
  }

  checkIsValidForm(): boolean {
    let flag = true;
    const value = this.associationForm.value;

    let cc = this.associationForm.get('cc_users').value;
    let ccm = this.associationForm.get('ccm_users').value;
    if (!cc) {
      flag = false;
      this.toastr.error('Please Select Content Creator', 'Content Creator Missing', { positionClass: 'toast-top-full-width', timeOut: 3000 })
    }
    if (!ccm) {
      flag = false;
      this.toastr.error('Please Select Content Creator Manager', 'Content Creator Manager Missing', { positionClass: 'toast-top-full-width', timeOut: 3000 })
    }
    if (this.associationForm.invalid) {
      flag = false;
      this.toastr.warning('Please Set All Privilegese', 'Privileges Missing', { positionClass: 'toast-top-full-width', timeOut: 3000 })
    }

    return flag;
  }

  addPrivilege() {
    if (this.currentObject.privileges) {
      this.httpSer.editPrivilege(this.currentObject.id, this.currentObject, this.currentObject.privileges.id)
        .subscribe(res => {
          if (res.type = 'Success') {
            this.toastr.success('Privileges Edit Successfully');
            // this.reset();
            // this.associationForm.reset();
            // this.currentObject = undefined;
          }
        });
    }
    // else {
    //   const pri = {
    //     likes: this.currentObject.likes,
    //     comments: this.currentObject.comments,
    //     posts: this.currentObject.posts,
    //     tiers: this.currentObject.tiers,
    //     orders: this.currentObject.orders,
    //     skus: this.currentObject.skus,
    //     chat_messages: this.currentObject.chat_messages,
    //     block_users: this.currentObject.block_users,
    //     get_subscribers: this.currentObject.get_subscribers,
    //     admin_id: this.currentObject.admin_id,
    //     reports: this.currentObject.reports,
    //   }
    //   this.currentObject.association_id = this.currentObject.id;
    //   this.httpSer.addPrivilege(this.currentObject.id, pri)
    //     .subscribe(resPri => {
    //       console.log(resPri);
    //     });
    // }
  }

  reset() {
    this.currentMode = 1;
    this.currentObject = undefined;
    this.associationForm.reset();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
