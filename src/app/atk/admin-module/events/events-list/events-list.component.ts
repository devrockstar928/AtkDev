import { Subject } from 'rxjs/Subject';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatMenuTrigger } from '@angular/material';
import { Event } from '../../../model/interface';
import { Router } from '@angular/router';
import { UserSessionService } from '../../../services/app-user-session.service';
import { ServerHttpService } from '../../../services/server-http.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit, AfterViewInit, OnDestroy {

  private ngUnsubscribe = new Subject<void>(); // for unscubscribe any observer before destroy component
  constructor(private router: Router,
    private userSession: UserSessionService,
    private httpSer: ServerHttpService) { }

  displayedColumns = ['event_name', 'event_value', 'event_active', 'event_frequency_times', 'event_frequency_unit', 'createdAt', 'actions'];

  dataSource: MatTableDataSource<Event>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  Event: Event[] = [];


  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.getAllEvent();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllEvent() {
    this.httpSer.getEvents()
    .takeUntil(this.ngUnsubscribe)
    .subscribe(res => {
      if (res.type == 'Success') {
        this.dataSource.data = res.data;
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  viewEvent(row: Event) {
    this.userSession.setSessionKey('event', row);
    this.router.navigate(['/admin/events', row.id]);
  }
  editEvent(row) {

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
