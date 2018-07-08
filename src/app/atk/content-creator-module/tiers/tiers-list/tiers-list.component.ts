import { TiersHttpService } from './../tiers-http.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserSessionService } from './../../../services/app-user-session.service';
import { User, Type_Of_Account, User_Session_Keys } from './../../../model/interface';
import { Subject } from 'rxjs/Subject';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, TemplateRef, Inject, Input } from '@angular/core';
import { Tier, UserLogin } from '../../../model/interface';
import { ServerHttpService } from '../../../services/server-http.service';
import { AuthenticationService } from '../../../../auth/_services/authentication.service';
import { MatTableDataSource, MatPaginator, MatMenuTrigger, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteModalComponent } from '../../../ui-component/delete-modal/delete-modal.component';

@Component({
    selector: 'app-tiers-list',
    templateUrl: './tiers-list.component.html',
    styles: [`
    .mat-column-id { flex: 0 0 15%; }
    .mat-column-tier_name { flex: 0 0 25%; }
    .mat-column-tier_value { flex: 0 0 25%; }
    `]
})
export class TiersListComponent implements OnInit, OnDestroy, AfterViewInit {

    displayedColumns = ['id', 'tier_name', 'tier_value', 'issubscribed', 'actions'];
    dataSource: MatTableDataSource<Tier> = new MatTableDataSource();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
    @Input() ShowActions = true;

    tiers: Tier[] = [];
    currentTier: Tier;
    userPrivilegs = {};
    private ngUnsubscribe = new Subject<void>(); // for unscubscribe any observer before destroy component
    constructor(private tiersSer: TiersHttpService,
        private userSession: UserSessionService,
        private router: Router,
        private toastr: ToastrService,
        public dialog: MatDialog,
        private authSer: AuthenticationService) { }

    ngOnInit() {
        if (!this.ShowActions) {
            this.displayedColumns.splice(this.displayedColumns.indexOf('actions'), 1);
        }
        this.userPrivilegs = this.authSer.PrivilegeKeys;
        this.getManagedUser$();
        this.getUserTies();
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
    getUserTies() {
        this.tiersSer
            .getUserTiers()
            .takeUntil(this.ngUnsubscribe)
            .subscribe(res => {
                // if (this.authSer.CurrentUserType == Type_Of_Account.Admin) {
                if (res.type == 'Success') {
                    this.tiers = res['data'];
                } else {
                    this.tiers = res['msg'];
                }
                this.dataSource.data = this.tiers;
            });
    }
    generateArray(obj) {
        const o = JSON.parse(obj);
        const c = Object.keys(o).map(key => o[key]);
        return c.join(', ');
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    // refresh() {
    //     this.getUserTies();
    // }
    addTier() {
        this.router.navigate(['/creator/tier', 0]);
    }

    editTier(tier) {
        this.userSession.setSessionKey('editTier', tier);
        this.router.navigate(['/creator/tier', tier.id]);
    }

    deleteTier(tier) {
        this.openDialog(tier);
    }
    openDialog(row: Tier): void {
        this.dialog.open(DeleteModalComponent, {
            width: '500px',
            height: '300px',
            data: { typename: 'tier', name: row.tier_name }
        }).afterClosed()
            .subscribe(result => {
                if (result) {
                    this.tiersSer.deleteUserTier(row).subscribe(res => {
                        if (res.type == 'Success') {
                            this.toastr.success(row.tier_name, 'delete success');
                            const index = this.tiers.indexOf(row);
                            if (index != -1) {
                                this.tiers.splice(index, 1);
                            }
                            this.dataSource.data = this.tiers;
                        }
                    });
                }
                // this.animal = result;
            });
    }

    //#endregion

    componentAction(event, row) {
        if (event == 2) {
            this.editTier(row);
        } else if (event == 3) {
            this.deleteTier(row);
        }
    }
    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
