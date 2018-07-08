import { Subject } from 'rxjs/Subject';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatMenuTrigger } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { User, SearchModel, Type_Of_Account } from '../../../model/interface';
import { FormControl } from '@angular/forms';
import { ReportsHttpService } from '../reports-http.service';
import { ServerHttpService } from '../../../services/server-http.service';

@Component({
  selector: 'app-rep-refund-summary',
  templateUrl: './rep-refund-summary.component.html',
  styleUrls: ['./rep-refund-summary.component.css']
})
export class RepRefundSummaryComponent implements OnInit {
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
  dataSource: MatTableDataSource<RepPledgeGrowth> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  // ******************************************************
  searchObj: SearchModel = {};

  resultData: RepPledgeGrowth[] = [];

  private ngUnsubscribe = new Subject<void>(); // for unscubscribe any observer before destroy component
  constructor(private repHttp: ReportsHttpService,
    private httpSer: ServerHttpService) { }
  
  ngOnInit() {
  }

  search() {
    this.getRefundSummaryRep(this.searchObj)
  }

  getRefundSummaryRep(obj?) {
    this.repHttp.getRefundSummaryRep(obj).subscribe(res => {
      console.log(res);
      if (res.type == 'Success') {
        // this.resultData = res.data;
        // this.dataSource.data = this.resultData;
      }
    });
  }

}

interface RepPledgeGrowth {
  deletedSubscritions?: { count: number; date_trunc: string }[];
  newSubscribers?: { count: number; date_trunc: string }[];
  totalSubscribersRevenue?: { count: number; date_trunc: string }[];
}


