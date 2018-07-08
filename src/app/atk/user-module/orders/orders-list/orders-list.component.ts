import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit, OnDestroy, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ServerHttpService } from '../../../services/server-http.service';
import { AuthenticationService } from '../../../../auth/_services/authentication.service';
import { User, Orders, Type_Of_Account } from '../../../model/interface';
import { MatTableDataSource, MatPaginator, MatSort, MatMenuTrigger } from '@angular/material';
import { downloadCSV } from '../../../model/gen-functions';

@Component({
  selector: 'app-orders-list',
  templateUrl: 'orders-list.component.html',
  styles: []
})
export class OrdersListComponent implements OnInit, AfterViewInit, OnDestroy {

  private userType: Type_Of_Account = Type_Of_Account.user;
  @Input() set UserType(value) {
    if (value) {
      this.userType = value;
      this.getOrders();
    }
  }


  displayedColumns = ['cc_name','user_name', 'payment_status', 'price', 'order_date','tracking_number', 'actions'];


  dataSource: MatTableDataSource<Orders>;
  @Input() ShowActions = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  orderList: Orders[] = [];

  private destroy$ = new Subject<false>(); // for unscubscribe any observer before destroy component

  constructor(private mainSer: ServerHttpService,
    private route: ActivatedRoute,
    private router: Router,
    private authSer: AuthenticationService) { }

  ngOnInit() {
    if(!this.ShowActions){
      this.displayedColumns.splice(this.displayedColumns.indexOf('actions'), 1);
    }
    // this.getOrders();
    this.dataSource = new MatTableDataSource(this.orderList);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getOrders() {
    this.mainSer
      .get_orders_list(this.userType)
      .takeUntil(this.destroy$)
      .subscribe(res => {
        this.orderList = res['msg'];
        this.dataSource.data = this.orderList;
      });
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  //#region
  viewSingleOrder(row: Orders) {
    // [routerLink]="['/user','orders',row.id,'view']"

    this.router.navigate(['../orders', row.id ? row.id : row.order_id], { relativeTo: this.route });
  }

  exportCSV(filename) {
    downloadCSV({ filename: 'order_list.csv' }, this.preperArray())
  }
  preperArray() {
    const arr = [];
    this.orderList.forEach(element => {
      

// tracking_number

      arr.push({
        'First Name': element.cc_first_name,
        'Last Name': element.cc_last_name,
        'User Name': `${element.user_first_name} ${element.user_last_name}`,
        'Product Purchased': '',
        'Product Price': element.price,
        'Order Date': element['order_date'] || '',
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
  ngOnDestroy() {
    this.destroy$.next(false);
    this.destroy$.complete();
  }
}
