import { Subject } from 'rxjs/Subject';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportsHttpService } from '../../../content-creator-module/content-reports/reports-http.service';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { SearchModel, Type_Of_Account, User } from '../../../model/interface';
import { ServerHttpService } from '../../../services/server-http.service';

@Component({
  selector: 'app-rep-churn-rate',
  templateUrl: './rep-churn-rate.component.html',
  styleUrls: ['./rep-churn-rate.component.css']
})
export class RepChurnRateComponent implements OnInit {

  // *****************************************************
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // ******************************************************
  ccList$: Observable<User[]>;
  ccList: User[] = [];
  ccField: FormControl = new FormControl();
  searchObj: SearchModel = {};

  resultData = [];
  single: { name: string; value: string }[] = [];
  view: any[] = [400];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  years: number[] = [];
  private ngUnsubscribe = new Subject<void>(); // for unscubscribe any observer before destroy component
  constructor(private repHttp: ReportsHttpService,
    private httpSer: ServerHttpService) { }

  ngOnInit() {
    this.view.unshift(document.getElementById('chartDiv').clientWidth);
    this.years = this.getyears();
    this.getCCList();
    this.searchObj.yearTo = new Date().getFullYear();
    this.searchObj.endDate = new Date().getMonth() + 1;

  }

  getyears(startYear?): number[] {
    let currentYear = new Date().getFullYear(), years = [];
    startYear = startYear || 1980;

    while (currentYear >= startYear) {
      years.push(currentYear--);
    }
    return years;
  }
  search() {
    // this.searchObj.cc = this.ccField.value ? this.ccField.value.id : undefined;
    this.getChurnRateRep(this.searchObj)
  }

  getChurnRateRep(obj?) {
    this.repHttp.getChurnRateRep(obj).subscribe(res => {
      console.log(res);
      if (res.type == 'Success') {
        this.resultData = res.data;
        this.setDataToMaterix();
      }
    });
  }
  setDataToMaterix() {
    // this.single = [];
    // if (this.resultData && this.resultData.length > 0) {
    //   this.resultData.forEach((item, index) => {
    //     const keys = Object.keys(item);
    //     if (keys[0] && item[keys[0]]) {
    //       this.single.push({ name: keys[0], value: item[keys[0]] });
    //     }
    //   });
    // }
    this.single = [];
    for (const key in this.resultData) {
      if (this.resultData.hasOwnProperty(key)) {
        const element = this.resultData[key];
        this.single.push({ name: this.setXFormatting(key), value: this.resultData[key] ? this.resultData[key] : 0 });
      }
    }
  }

  setXFormatting(date) {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).toLocaleDateString();
  }

  convertResultToArray() {
    return Object.keys(this.resultData).map(key => {
      return { date: key, value: this.resultData[key] ? this.resultData[key]: 0 };
    });
    // return Object.keys(obj).map(key => obj[key]);
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