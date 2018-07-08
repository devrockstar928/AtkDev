import { Subject } from 'rxjs/Subject';
import { ServerHttpService } from './../../services/server-http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SupportTicket } from '../../model/interface';
import { MatTableDataSource, MatPaginator, MatMenuTrigger, MatSort, PageEvent } from '@angular/material';
import { AuthenticationService } from '../../../auth/_services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-support-tickets',
  templateUrl: './support-tickets.component.html',
  styleUrls: ['./support-tickets.component.css']
})
export class SupportTicketsComponent implements OnInit {

  displayedColumns = ['id', 'ccName', 'senderName', 'message', 'reason', 'createdAt', 'updatedAt'];
  dataSource: MatTableDataSource<SupportTicket> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  tickets: SupportTicket[] = [];
  currentPageIndex = 1;
  userPrivilegs = {};
  pageSize = 0;
  private ngUnsubscribe = new Subject<void>(); // for unscubscribe any observer before destroy component
  constructor(private httpSer: ServerHttpService,
    private toastr: ToastrService,
    private authSer: AuthenticationService) { }

  ngOnInit() {
    this.getSupportTickets();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getSupportTickets(page?) {
    this.httpSer.getSupportTickets(page).subscribe(res => {
      console.log(res);
      if (res.type == 'Success') {
        if (res['data'] && res['data'].length > 0) {
          this.tickets.push(...res['data']);
          this.dataSource.data = this.tickets;
          // this.dataSource.data = this.tickets;
          // this.pageSize += this.tickets.length;
        }
      }
    })
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  paginate(event: PageEvent) {
    if (event.pageIndex + 1 > this.currentPageIndex) {
      this.currentPageIndex = event.pageIndex + 1;
      this.getSupportTickets(this.currentPageIndex);
    }
  }
}
