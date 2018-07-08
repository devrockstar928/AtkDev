import { SearchModel, ChartMatrix } from './../../../model/interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ReportsHttpService } from '../../../content-creator-module/content-reports/reports-http.service';
import { User, Type_Of_Account } from '../../../model/interface';
import { ServerHttpService } from '../../../services/server-http.service';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatMenuTrigger, PageEvent } from '@angular/material';

@Component({
  selector: 'app-rep-subscriptions',
  templateUrl: './rep-subscriptions.component.html',
  styleUrls: ['./rep-subscriptions.component.css']
})
export class RepSubscriptionsComponent implements OnInit {
  // *****************************************************

  displayedColumns = [
    'id',
    'cc_id',
    'tier_id',
    'user_id',
    'price',
    'stripe_id',
    'action_type',
    'description',
    'created_at',
    'end_date',
  ];
  dataSource: MatTableDataSource<repsub> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  // ******************************************************
  ccList$: Observable<User[]>;
  ccList: User[] = [];
  ccField: FormControl = new FormControl();
  searchObj: SearchModel = { length: 25, page: 1 };

  multi: ChartMatrix[] = [];


  view: any[] = [400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  showYAxisLabel = true;
  yAxisLabel = '# of Events';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;
  resultData: repsub[] = [];

  private ngUnsubscribe = new Subject<void>(); // for unscubscribe any observer before destroy component
  constructor(private repHttp: ReportsHttpService,
    private httpSer: ServerHttpService) { }

  ngOnInit() {
    this.view.unshift(document.getElementById('chartDiv').clientWidth);
    this.getSubscriptionsRep(this.searchObj);
    this.getCCList();
  }

  search(event) {
    // this.searchObj.cc = this.ccField.value ? this.ccField.value.id : undefined;
    this.getSubscriptionsRep(this.searchObj)
  }
  getSubscriptionsRep(obj?) {
    this.repHttp.getSubscriptionsRep(obj).subscribe(res => {
      console.log
      if (res.type == 'Success') {
        this.resultData = res.data;
        this.dataSource.data = this.resultData;
        this.setDataToMaterix();
      }
    });
  }

  setDataToMaterix() {
    this.multi = [];
    this.resultData.forEach((item: repsub) => {
      let c = <ChartMatrix>{};
      if (item.action_type) {
        c.name = item.action_type;
        c.series = [{ name: item.created_at ? new Date(item.created_at).toLocaleDateString() : undefined, 
                      value: parseInt(item.price ? item.price.toString() : '0') }];
        const element = this.multi.find(ele => ele.name == c.name);
        if (element) {
          let d = element.series.find(res =>
            new Date(res.name).toLocaleDateString() ==
            new Date(c.series[0].name).toLocaleDateString());
          if (d) {
            d.value = parseInt(d.value ? d.value.toString() : '0') + parseInt(c.series[0].value ? c.series[0].value.toString() : '0');
          } else {
            element.series.push(c.series[0]);
          }
        } else {
          this.multi.push(c);
        }
      }
      console.log(this.multi);
    });
  }
  onSelect(event) {
    console.log(event);
  }

  setXFormatting(date: Date) {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).toLocaleDateString();
  }

  paginate(event: PageEvent) {
    this.searchObj.page = event.pageIndex + 1;
    this.getSubscriptionsRep(this.searchObj)
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

interface repsub {
  action_type?: string;
  cc_id?: number;
  created_at?: Date;
  description?: string;
  end_date?: Date;
  id?: number;
  price?: number;
  stripe_id?: number;
  tier_id?: number;
  user_id?: number;
}

