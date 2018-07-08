import { Subject } from 'rxjs/Subject';
import { ActivatedRoute } from '@angular/router';
import { ServerHttpService } from './../../../services/server-http.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatMenuTrigger } from '@angular/material';
import { Subscribtions } from '../../../model/interface';

@Component({
  selector: 'app-subscriber-profile-subs',
  templateUrl: './subscriber-profile-subs.component.html',
  styleUrls: ['./subscriber-profile-subs.component.css']
})
export class SubscriberProfileSubsComponent implements OnInit, AfterViewInit {
  displayedColumns = [, 'cc_first_name', 'user_first_name', 'subscription_value', 'creation_date',
    'end_date', 'payment_status', 'renew_date'];
  dataSource: MatTableDataSource<Subscribtions> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  subs = [];
  private ngUnsubscribe = new Subject<void>(); // for unscubscribe any observer before destroy component
  constructor(private httpSer: ServerHttpService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(parm => {
      if (+parm['id'] > 0) {
        this.get_cc_subscriptions(+parm['id'])
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  get_cc_subscriptions(id) {
    this.httpSer.get_cc_subscriptions(id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        if (res.type = 'Success') {
          this.subs = res['data'];
          this.dataSource.data = this.subs;
        }
      })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
