import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { ServerHttpService } from './../../../services/server-http.service';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatMenuTrigger } from '@angular/material';
import { Privilege_type, User_Session_Keys, Privilege } from '../../../model/interface';
import { UserSessionService } from '../../../services/app-user-session.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-association-list',
  templateUrl: './association-list.component.html',
  styleUrls: ['./association-list.component.css']
})
export class AssociationListComponent implements OnInit, AfterViewInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>(); // for unscubscribe any observer before destroy component

  constructor(private router: Router,
    private userSession: UserSessionService,
    private toastr: ToastrService,
    private httpSer: ServerHttpService) { }

  displayedColumns = ['cc_users', 'ccm_users', 'posts', 'likes', 'comments',
    , 'block_users', 'chat_messages', 'get_subscribers', 'orders', 'reports'
    , 'skus', 'tiers', 'createdAt', 'actions'];

  dataSource: MatTableDataSource<Privilege>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  associations: Privilege[] = [];


  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.getAllAssociations();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllAssociations() {
    this.httpSer.getAssociation()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        if (res.type == 'Success') {
          this.associations = res.data;
          this.dataSource.data = this.associations;
        }
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getPrivilegeText(value: number): string | undefined {
    return value ? Privilege_type[value] : undefined;
  }

  getTextColor(value: number): string {
    let textcolor = '';
    switch (value) {
      case 0: textcolor = ''; break; // none
      case 1: textcolor = 'text-secondary'; break; // read
      case 2: textcolor = 'text-primary'; break; // update
      case 3: textcolor = 'text-success'; break; // create
      case 4: textcolor = 'text-danger'; break; // delete

      default:
        break;
    }
    return textcolor;

  }

  viewAssociation(row: Privilege) {
    this.userSession.setSessionKey(User_Session_Keys.Association, row);
    this.router.navigate(['/admin/association', row.id, 'view']);
  }

  editAssociation(row: Privilege) {
    this.userSession.setSessionKey(User_Session_Keys.Association, row);
    this.router.navigate(['/admin/association', row.id, 'edit']);
  }

  deleteAssociation(row: Privilege) {
    this.httpSer.deleteAssociation(row.id).subscribe(res => {
      if (res.type == 'Success') {
        this.toastr.success('Association Deleted Succesfly', 'Data Deleted');
        const index = this.associations.indexOf(row);
        if (index > -1) {
          this.associations.splice(index, 1)
          this.dataSource.data = this.associations;
        }

      }
    })
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
