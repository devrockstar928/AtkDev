import { AuthenticationService } from './../../../../auth/_services/authentication.service';
import { UserSessionService } from './../../../services/app-user-session.service';
import { Type_Of_Account } from './../../../model/interface';
import { ServerHttpService } from './../../../services/server-http.service';
import { MatSelectionList, MatListOption, MatTableDataSource, MatSort, MatMenuTrigger, MatPaginator, MatCheckbox } from '@angular/material';
import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../model/interface';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, AfterViewInit {
  private userType = Type_Of_Account.all;
  @Input() set UserType(value) {
    if (value) {
      this.userType = value;
    }
  }
  filterColumns = [{ key: 'id', value: 'User ID' }
    , { key: 'avater', value: 'Profile Picture' }
    , { key: 'name', value: 'Full Name' }
    , { key: 'email', value: 'Email' }
    , { key: 'level', value: 'Level' }
    , { key: 'xp', value: 'XP' }
    , { key: 'sub', value: 'Number of Subscriptions' }];

  displayedColumns = ['id', 'avater', 'name', 'email', 'level', 'xp', 'sub'];
  // readonly col = ['userID', 'profilePicture', 'fullName', 'email', 'level', 'xP', 'numOfSub'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  showIfAdminUser = false;
  users: User[] = [];
  constructor(private router: Router,
    private userSession: UserSessionService,
    private route: ActivatedRoute,
    private authSer:AuthenticationService,
    private httpSer: ServerHttpService) { }

  ngOnInit() {
    this.checkIfAdmin();
    this.dataSource = new MatTableDataSource([]);
    this.gerUsersList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  gerUsersList() {
    this.httpSer.getUserslist(this.userType).subscribe(res => {
      if (res['type'] == 'Success') {
        this.dataSource.data = res['data'];
      }
    });
  }

  // add/remove viewable column
  changeViewCol(col, value: MatCheckbox) {
    if (value.checked) {
      this.displayedColumns.push(col);
      this.displayedColumns = this.filterColumns.filter(it => this.displayedColumns.indexOf(it.key) != -1).map(elem => elem.key);
      this.checkIfAdmin();

    } else {
      this.displayedColumns.splice(this.displayedColumns.indexOf(col), 1);
    }
  }
  checkIfAdmin() {
    if (this.authSer.CurrentUserType == Type_Of_Account.Admin) {
      this.showIfAdminUser = true;
      this.displayedColumns.push('actions');
    }
  }
  // used to check it current col viewable or not
  checkIfColViewable(col) {
    let flag = true;
    flag = this.displayedColumns.find(ele => ele === col) ? true : false;
    return flag;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  //#region
  viewProfile(row: User) {
    this.userSession.setSessionKey('user', row);
    // this.router.navigate(['', row.id]);
    this.router.navigate(['../../profile', row.id, 'view'], { relativeTo: this.route });
  }

  editProfile(row) {
    this.userSession.setSessionKey('editProfile', row);
    this.router.navigate(['../', row.id, 'edit'], { relativeTo: this.route });
  }
  deleteProfile() { }

  // colClicked(item: MatSelectionList) {
  //   this.displayedColumns = [];
  //   item.selectedOptions.selected.forEach((elem: MatListOption) => {
  //     this.displayedColumns.unshift(elem.value);
  //   });
  //   this.displayedColumns = this.col.filter(it => this.displayedColumns.indexOf(it) != -1);
  //   this.displayedColumns.push('actions');
  // }
}
export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}
