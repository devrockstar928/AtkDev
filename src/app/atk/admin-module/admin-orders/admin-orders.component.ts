import { Type_Of_Account } from './../../model/interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  userType = Type_Of_Account.Admin;
  
  constructor() { }

  ngOnInit() {
  }

}
