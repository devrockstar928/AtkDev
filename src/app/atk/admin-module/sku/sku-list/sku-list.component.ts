import { Subject } from 'rxjs/Subject';
import { Sku, Type_Of_Account, User_Session_Keys } from './../../../model/interface';
import { MatTableDataSource, MatPaginator, MatSort, MatMenuTrigger, MatDialog } from '@angular/material';
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { ServerHttpService } from '../../../services/server-http.service';
import { UserSessionService } from '../../../services/app-user-session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../../auth/_services';
import { DeleteModalComponent } from '../../../ui-component/delete-modal/delete-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sku-list',
  templateUrl: './sku-list.component.html',
  styleUrls: ['./sku-list.component.css']
})
export class SkuListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['id', 'product_type', 'size', 'is_signed', 'price', 'actions'];

  dataSource: MatTableDataSource<Sku> = new MatTableDataSource();
  @Input() ShowActions = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  skus: Sku[] = [];
  currentTier: Sku;
  userPrivilegs = {};

  private ngUnsubscribe = new Subject<false>(); // for unscubscribe any observer before destroy component
  constructor(private httpSer: ServerHttpService,
    private userSession: UserSessionService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private authSer: AuthenticationService) { }

  ngOnInit() {
    if (!this.ShowActions) {
      this.displayedColumns.splice(this.displayedColumns.indexOf('actions'), 1);
    }
    this.userPrivilegs = this.authSer.PrivilegeKeys;
    this.getManagedUser$();
    this.getUserSkus();
    this.getCuManagedUser$();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getManagedUser$() {
    this.userSession
      .getSessionKey$(User_Session_Keys.Managed_User_Change)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        if (res.name == User_Session_Keys.Managed_User_Change) {
          this.userPrivilegs = this.authSer.PrivilegeKeys;
        }
      })
  }
  getCuManagedUser$() {
    this.userSession
      .getSessionKey$(User_Session_Keys.Managed_User)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        if (res.name == User_Session_Keys.Managed_User) {
          this.getUserSkus();
        }
      })
  }

  // cc_id createdAt created_at id is_signed price product_id product_type
  // size sku_id updatedAt
  // users.avatar users.city users.country users.email users.first_name users.id users.last_name users.user_name
  getUserSkus() {
    this.httpSer
      .admin_skus()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        // if (this.authSer.CurrentUserType == Type_Of_Account.Admin) {
        if (res.type == 'Success') {
          this.skus = res['data'];
          this.dataSource.data = this.skus;
          // }
        } else {
          if (res['msg']) {
            this.skus = res['msg'];
            this.dataSource.data = this.skus;
          }
        }
      });
  }
  generateArray(obj) {
    const c = Object.keys(obj).map(key => obj[key]);
    return c.join(',');
  }
  hideActions() {
    if (!this.ShowActions) {
      return true;
    }
    return false;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  // refresh() {
  //     this.getUserTies();
  // }
  addSku() {
    this.router.navigate(['../products', 0, 'edit'], { relativeTo: this.route });
  }

  viewSku(sku) {
    this.userSession.setSessionKey('editsku', sku);
    this.router.navigate(['../products', sku.id], { relativeTo: this.route });
  }

  editSku(sku) {
    this.userSession.setSessionKey('editsku', sku);
    this.router.navigate(['../products', sku.id, 'edit'], { relativeTo: this.route });
  }

  deleteSku(sku) {
    this.openDialog(sku);
  }
  openDialog(row: Sku): void {
    this.dialog.open(DeleteModalComponent, {
      width: '500px',
      height: '300px',
      data: { typename: 'tier', name: row.product_type }
    }).afterClosed()
      .subscribe(result => {
        if (result) {
          this.httpSer.admin_skus_delete(row).subscribe(res => {
            if (res.type == 'Success') {
              this.toastr.success(row.product_type, 'delete success');
              const index = this.skus.indexOf(row);
              if (index != -1) {
                this.skus.splice(index, 1);
              }
              this.dataSource.data = this.skus;
            }
          });
        }
        // this.animal = result;
      });
  }
  //#endregion

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

