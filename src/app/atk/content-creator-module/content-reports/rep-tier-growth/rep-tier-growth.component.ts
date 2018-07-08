import { AuthenticationService } from './../../../../auth/_services/authentication.service';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User, SearchModel, Type_Of_Account, ChartMatrix } from '../../../model/interface';
import { FormControl } from '@angular/forms';
import { ReportsHttpService } from '../reports-http.service';
import { ServerHttpService } from '../../../services/server-http.service';
import { TiersHttpService } from '../../tiers/tiers-http.service';

@Component({
  selector: 'app-rep-tier-growth',
  templateUrl: './rep-tier-growth.component.html',
  styleUrls: ['./rep-tier-growth.component.css']
})
export class RepTierGrowthComponent implements OnInit {
  // *****************************************************
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  multi: ChartMatrix[] = []
  ccList$: Observable<User[]>;
  ccList: User[] = [];
  ccField: FormControl = new FormControl();
  searchObj: SearchModel = {};
  tierid;
  resultData: RepTierGrowth[] = [];
  single: { name: any; value: string }[] = [];
  view: any[] = [400];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  tiresValues = [];
  private ngUnsubscribe = new Subject<void>(); // for unscubscribe any observer before destroy component
  constructor(private repHttp: ReportsHttpService,
    private tierSer: TiersHttpService,
    private authSer: AuthenticationService,
    private httpSer: ServerHttpService) { }

  ngOnInit() {
    this.searchObj.cc = this.authSer.currentUser.id;
    this.searchObj.endDate = new Date();
    this.view.unshift(document.getElementById('chartDiv').clientWidth);
    // this.getCCList();
    this.getContentTiers();
  }

  search() {
    // this.searchObj.cc = this.ccField.value ? this.ccField.value.id : undefined;
    this.getTierGrowthRep(this.searchObj)
  }

  getTierGrowthRep(obj?) {
    this.repHttp.getTierGrowthRep(this.tierid, obj).subscribe(res => {
      console.log(res);
      if (res.type == 'Success') {
        this.resultData = res.data;
        this.setDataToMaterix();
      }
    });
  }

  setDataToMaterix() {
    this.single = [];
    this.resultData.forEach(item => {
      // const d = this.multi.find(ele => this.setXFormatting(item.date_trunc) == ele.name);
      // if (d) {
      //   d.series.push({ name: 'New And Increased Pledges', value: item.count });
      // } else {
      //   this.multi.push({ name: this.setXFormatting(item.date_trunc), 
      //                     series: [{ name: 'New And Increased Pledges', value: item.count }] });
      // }

      this.single.push({
        name: this.setXFormatting(item.date_trunc),
        value: item.count
      })
    })
  }
  generateTotalName(month) {
    return new Date(this.searchObj.startDate.getFullYear(), month - 1, 1).toLocaleDateString();

  }
  getMonthName(item) {
    const keys = Object.keys(item);
    return this.monthNames[parseInt(keys[0]) - 1];
  }
  getMonthValue(item) {
    const keys = Object.keys(item);
    return item[keys[0]];
  }
  setXFormatting(date) {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).toLocaleDateString();
  }
  addSeries(item) {
    return { name: item.date_trunc ? this.setXFormatting(item.date_trunc) : undefined, value: item.count ? item.count : '0' }
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

  getContentTiers() {
    this.tierSer.getUserTiers().subscribe(res => {
      this.tiresValues = res['msg'];
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
interface RepTierGrowth {
  count: string;
  date_trunc: string;
}

