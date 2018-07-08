import { Subject } from 'rxjs/Subject';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportsHttpService } from '../../../content-creator-module/content-reports/reports-http.service';
import { User, Type_Of_Account, ChartMatrix, SearchModel } from '../../../model/interface';
import { MatTableDataSource, MatPaginator, MatSort, MatMenuTrigger } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { ServerHttpService } from '../../../services/server-http.service';

@Component({
  selector: 'app-rep-engagement',
  templateUrl: './rep-engagement.component.html',
  styleUrls: ['./rep-engagement.component.css']
})
export class RepEngagementComponent implements OnInit {

  // *****************************************************
  ccList$: Observable<User[]>;
  ccList: User[] = [];
  ccField: FormControl = new FormControl();
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  multi: ChartMatrix[] = []

  view: any[] = [400];


  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  // ******************************************************
  searchObj: SearchModel = {};

  resultData: RepEngagement[] = [];

  private ngUnsubscribe = new Subject<void>(); // for unscubscribe any observer before destroy component
  constructor(private repHttp: ReportsHttpService,
    private httpSer: ServerHttpService) { }

  ngOnInit() {
    this.getCCList();
    this.view.unshift(document.getElementById('chartDiv').clientWidth);
  }

  search() {
    this.getEngagementRep(this.searchObj)
  }

  getEngagementRep(obj?) {
    this.repHttp.getEngagementRep(obj).subscribe(res => {
      console.log(res);
      if (res.type == 'Success') {
        this.resultData = res.data;
        this.setDataToMaterix();
        // this.dataSource.data = this.resultData;
      }
    });
  }

  setDataToMaterix() {
    this.multi = [];
    this.resultData.forEach((item: RepEngagement) => {
      let c = <ChartMatrix>{};
      if (item.type) {
        c.name = new Date(item.day).toLocaleDateString();
        c.series = [{
          name: item.type,
          value: parseInt(item.count ? item.count.toString() : '0')
        }];
        const element = this.multi.find(ele => ele.name == c.name);
        if (element) {
          let d = element.series.find(res => res.name == c.series[0].name)
          if (d) {
            d.value = parseInt(d.value ? d.value.toString() : '0') + parseInt(c.series[0].value ? c.series[0].value.toString() : '0');
          } else {
            element.series.push(c.series[0]);
          }
        } else {
          this.multi.push(c);
        }
      }
    });
    console.log(this.multi);
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
  onSelect(event) {
    console.log(event);
  }

  addSeries(item) {
    return { name: item.date_trunc ? this.setXFormatting(item.date_trunc) : undefined, value: item.count ? item.count : '0' }
  }
  setXFormatting(date) {
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

interface RepEngagement {
  count: number;
  day: Date;
  type: string;
}


