import { AuthenticationService } from './../../../../auth/_services/authentication.service';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatMenuTrigger } from '@angular/material';
import { Subscriber } from '../../../model/interface';
import { ServerHttpService } from '../../../services/server-http.service';
import { UserSessionService } from '../../../services/app-user-session.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { downloadCSV } from '../../../model/gen-functions';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements OnInit, OnDestroy {
  displayedColumns = ['profile_picture', 'first_name', 'last_name', 'user_name', 'tier_name', 'tier_value'
    , 'creation_date', 'end_date', 'renew_date', 'actions'];
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  dataSource: MatTableDataSource<Subscriber> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @Input() ShowActions = true;

  month: number = -1;
  year: number;
  page: number;
  years: number[];
  subscribers: Subscriber[] = [];
  currentSubscriber: Subscriber;
  private ngUnsubscribe = new Subject<void>(); // for unscubscribe any observer before destroy component
  constructor(private mainSer: ServerHttpService,
    private userSession: UserSessionService,
    private router: Router,
    private toastr: ToastrService,
    private authSer: AuthenticationService) { }

  ngOnInit() {
    this.getSubscriber();
    this.years = this.getyears();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  search(event) {
    this.getSubscriber();
  }

  getyears(startYear?): number[] {
    let currentYear = new Date().getFullYear(), years = [];
    startYear = startYear || 1980;

    while (currentYear >= startYear) {
      years.push(currentYear--);
    }
    return years;
  }

  pageEvent(event) {
    this.page = event.pageIndex;
    if (this.month && this.year) {
      this.getSubscriber();
    }
  }
  getSubscriber() {
    this.mainSer
      .get_user_subscriptions(this.month, this.year, this.page)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        if (this.month && this.year &&res['data']) {
          this.subscribers = res['data']['result'];
          this.subscribers.forEach(element => {
            element.creation_date=element['user_subscription'][0].creation_date;
            element.end_date=element['user_subscription'][0].end_date;
            element['price']=element['user_subscription'][0].price;
            //  id
            //  payment_status
            //  
          });
        } else {
          if (res['subs']) {
            this.subscribers = res['subs'];
          } else if (res['success'] = true) {
            this.subscribers = res['msg'];
          }
        }
        this.dataSource.data = this.subscribers;
        this.dataSource._updateChangeSubscription();
      });
  }
  generateArray(obj) {
    if(obj){
      const c = Object.keys(obj).map(key => obj[key]);
      return c.join(',');
    }
  }
  mapDataToSameFomat(){
    const sub:Subscriber[]= [];
    this.subscribers.map(sub=>{
      return {
          //  city
          //  country
          //  email
          //  first_name
          //  id
          //  last_name
          //  line1
          //  postal_code
          //  state
          //  user_name
          //  user_subscription
          //  Array(1)
          //  0
          //  creation_date
          //  end_date
          //  id
          //  payment_status
          //  price
    } as Subscriber;
    })
    }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  exportCSV(filename) {
    downloadCSV({ filename: 'Subscriber_List.csv' }, this.preperArray())
  }
  preperArray() {
    const arr = [];
    this.subscribers.forEach(element => {
      arr.push({
        'First Name': element.first_name,
        'Last Name': element.last_name,
        'Email': element['email'],
        'Username': element.user_name,
        'Subscription value/Tier': element.tier_value?element.tier_value:element['price'],
        'Lifetime Value': '',
        'Pledge/Start Date': new Date(element.creation_date).toDateString(),
        'Status': element['payment_status'] || '',
        'Street': element['line1'] || '',
        'City': element['city'] || '',
        'State': element['state'] || '',
        'Zip': element['postal_code'] || '',
        'Country': element['country'] || ''
      })
    });
    return arr;
  }
  //#endregion

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
