import { ServerHttpService } from './../../services/server-http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ScreenShot } from '../../model/interface';
import { MatSort, MatPaginator, MatMenuTrigger, MatTableDataSource, PageEvent } from '@angular/material';

@Component({
  selector: 'app-screenshot-logs',
  templateUrl: './screenshot-logs.component.html',
  styles: [`
  .mat-column-id { flex: 0 0 5%; }
  .mat-column-user_id { flex: 0 0 10%; }
  .mat-column-file_name { flex: 0 0 65%; }
  .mat-column-createdAt { flex: 0 0 10%; }
  .mat-column-updatedAt { flex: 0 0 10%; }
  `]
})
export class ScreenshotLogsComponent implements OnInit {
  displayedColumns = ['id', 'user_id', 'file_name', 'createdAt', 'updatedAt']

  dataSource: MatTableDataSource<ScreenShot> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  logs: ScreenShot[] = [];
  constructor(private HttpSer: ServerHttpService) { }

  ngOnInit() {
    this.getScreenshots()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getScreenshots(paginate?) {
    this.HttpSer
      .getScreenShotsLog(paginate)
      .subscribe(res => {
        if (res.type == 'Success') {
          this.logs = res.data;
          this.dataSource.data = this.logs;
        }
      })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  paginate(event: PageEvent) {
    // this.getScreenshots(event.pageIndex + 1);
  }
}
