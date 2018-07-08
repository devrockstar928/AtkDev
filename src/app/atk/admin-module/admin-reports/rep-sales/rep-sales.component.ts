import { AuthenticationService } from './../../../../auth/_services/authentication.service';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportsHttpService } from '../../../content-creator-module/content-reports/reports-http.service';
import { User, Type_Of_Account, ChartMatrix, SearchModel } from '../../../model/interface';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { ServerHttpService } from '../../../services/server-http.service';

@Component({
  selector: 'app-rep-sales',
  templateUrl: './rep-sales.component.html',
  styleUrls: ['./rep-sales.component.css']
})
export class RepSalesComponent implements OnInit {
  // *****************************************************

  readonly monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // ******************************************************
  ccList$: Observable<User[]>;
  ccList: User[] = [];
  ccField: FormControl = new FormControl();
  searchObj: SearchModel = {};

  single: { name: string; value: string }[] = [];


  view: any[] = [400];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  years: number[] = [];
  // line, area
  autoScale = true;
  resultData: { date_trunc: Date; sum: number }[] = [];
  userType;
  private ngUnsubscribe = new Subject<void>(); // for unscubscribe any observer before destroy component
  constructor(private repHttp: ReportsHttpService,
    private authSer: AuthenticationService,
    private httpSer: ServerHttpService) { }

  ngOnInit() {
    this.userType = this.authSer.CurrentUserType;
    if (this.userType == Type_Of_Account.CreatorContent) {
      this.searchObj.cc = this.authSer.currentUser.id;
    }
    this.years = this.getyears();
    this.view.unshift(document.getElementById('chartDiv').clientWidth);
    // this.getSalesRep('');
    this.getCCList();
    this.searchObj.yearTo = new Date().getFullYear();
    // this.searchObj['endDate'] = new Date().getMonth() + 1;
  }

  search() {
    // this.searchObj.cc = this.ccField.value ? this.ccField.value.id : undefined;
    this.getSalesRep(this.searchObj)
  }

  getSalesRep(obj?) {
    this.repHttp.getSalesRep(obj).subscribe(res => {
      console.log
      if (res.type == 'Success') {
        if (res.data && res.data[0] != null) {
          this.resultData = res.data;
          this.setDataToMaterix();
        }
      }
    });
  }
  getyears(startYear?): number[] {
    let currentYear = new Date().getFullYear(), years = [];
    startYear = startYear || 1980;

    while (currentYear >= startYear) {
      years.push(currentYear--);
    }
    return years;
  }
  setDataToMaterix() {
    this.single = [];
    this.resultData.forEach((item, index) => {
      const keys = Object.keys(item);
      this.single.push({ name: this.setXFormatting(item.date_trunc), value: item.sum.toString() });
    });
  }
  onSelect(event) {
    console.log(event);
  }
  setXFormatting(date: Date) {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).toLocaleDateString();
  }

  //#region cc area

  getCCList() {
    this.httpSer
      .getUserslist(Type_Of_Account.CreatorContent)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        if (res['type'] == 'Success') {
          this.ccList = res['data'];
          this.ccList.map(cc => cc.fullName = `${cc.first_name} ${cc.last_name}`);
          // this.makeCCObservable$();
        }
      });
  }

  makeCCObservable$() {
    this.ccList$ = this.ccField.valueChanges
      .startWith('')
      .map(name => name ? this.filterCCList(name) : this.ccList.slice()
      );
  }

  filterCCList(value: string) {
    return typeof value === 'string' ? this.ccList.filter(cc =>
      cc.fullName ? cc.fullName.toLowerCase().indexOf(value.toLowerCase()) === 0 : -1) : [];
  }

  displayFn(user: User): string | undefined {
    return user ? user.fullName : undefined;
  }

  //#endregion

}

// interface repsub {
//   action_type?: string;
//   cc_id?: number;
//   created_at?: Date;
//   description?: string;
//   end_date?: Date;
//   id?: number;
//   price?: number;
//   stripe_id?: number;
//   tier_id?: number;
//   user_id?: number;
// }


