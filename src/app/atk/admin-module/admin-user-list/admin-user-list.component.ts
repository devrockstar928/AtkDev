import { Type_Of_Account } from './../../model/interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {

  type = Type_Of_Account.Admin;
  constructor() { }

  ngOnInit() {
  }

}
