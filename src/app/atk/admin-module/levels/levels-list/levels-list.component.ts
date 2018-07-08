import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { UserSessionService } from '../../../services/app-user-session.service';
import { ServerHttpService } from '../../../services/server-http.service';
import { MatTableDataSource, MatPaginator, MatSort, MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'app-levels-list',
  templateUrl: './levels-list.component.html',
  styleUrls: ['./levels-list.component.css']
})
export class LevelsListComponent implements OnInit, AfterViewInit , OnDestroy {

  private ngUnsubscribe = new Subject<void>(); // for unscubscribe any observer before destroy component
  constructor(private router: Router,
    private userSession: UserSessionService,
    private httpSer: ServerHttpService) { }

  displayedColumns = ['id', 'level_value', 'xp_value', 'createdAt', 'actions'];
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
    this.httpSer.getLevels()
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


  viewLevel(row) {
    this.userSession.setSessionKey('level', row);
    this.router.navigate(['/admin/levels', row.id]);
  }
  editLevel(row) {

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
