import { Router, ActivatedRoute } from '@angular/router';
import { ContentCreator } from './../../../model/interface';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as faker from 'faker';
import { MatTableDataSource, MatPaginator, MatSort, MatMenuTrigger, MatSelectionList, MatListOption } from '@angular/material';

@Component({
  selector: 'app-creator-profile-list',
  templateUrl: './creator-profile-list.component.html',
  styleUrls: ['./creator-profile-list.component.css']
})
export class CreatorProfileListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['userID', 'profilePicture', 'fullName', 'email', 'level', 'xP', 'numOfTiers', 'numOfPosts', 'actions'];
  readonly col = ['userID', 'profilePicture', 'fullName', 'email', 'level', 'xP', 'numOfTiers', 'numOfPosts'];
  dataSource: MatTableDataSource<ContentCreator>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  creators = [];
  constructor(private router: Router
    , private route: ActivatedRoute) { }

  ngOnInit() {
    this.generateCreator(100);
    this.dataSource = new MatTableDataSource(this.creators);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  checkIfCol(col) {
    let flag = true;
    flag = this.displayedColumns.find(ele => ele === col) ? true : false;
    return flag;
  }
  generateCreator(count) {
    for (let index = 0; index < count; index++) {
      this.creators.push(this.getContentCreator());

    }
  }

  getContentCreator(): ContentCreator {
    return {
      userID: faker.random.number(),
      profilePicture: faker.image.avatar(),
      fullName: faker.name.findName(),
      email: faker.internet.email(),
      level: faker.random.number(100),
      xP: faker.random.number(),
      numOfTiers: faker.random.number(20),
      numOfPosts: faker.random.number(250),
    } as ContentCreator;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  //#region
  viewProfile(row: ContentCreator) {
    this.router.navigate(['../profile', row.userID, 'view'], { relativeTo: this.route });
  }
  editProfile() { }
  deleteProfile() { }
  //#endregion
  // /** Builds and returns a new User. */
  //  createNewUser(id: number): UserData {
  //   const name =
  //     NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
  //     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  //   return {
  //     id: id.toString(),
  //     name: name,
  //     progress: Math.round(Math.random() * 100).toString(),
  //     color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  //   };
  // }

  // /** Constants used to fill up our data base. */
  // const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  //   'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
  // const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  //   'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  //   'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];
  // }

  onmouseout() {
    // this.hiddenFlag = true;
    this.trigger.closeMenu();

  }
  onmouseover(event) {
    event.preventDefault();
    // this.hiddenFlag = false;
    this.trigger.openMenu();
  }
  colClicked(item: MatSelectionList) {
    this.displayedColumns = [];
    item.selectedOptions.selected.forEach((elem: MatListOption) => {
      this.displayedColumns.unshift(elem.value);
    });
    this.displayedColumns = this.col.filter(it => this.displayedColumns.indexOf(it) != -1);
    this.displayedColumns.push('actions');
  }
}
export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

