import { Component, OnInit } from '@angular/core';
import { Type_Of_Account } from '../../model/interface';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  userType = Type_Of_Account.user;

  constructor() { }

  ngOnInit() {
  }

}
