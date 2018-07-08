import { Type_Of_Account } from './../../model/interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.css']
})
export class ManagerListComponent implements OnInit {

  type = Type_Of_Account.CreatorManager;
  constructor() { }

  ngOnInit() {
  }

}
