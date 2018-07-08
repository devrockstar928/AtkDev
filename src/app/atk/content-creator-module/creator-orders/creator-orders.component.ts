import { Component, OnInit } from '@angular/core';
import { Type_Of_Account } from '../../model/interface';

@Component({
  selector: 'app-creator-orders',
  templateUrl: './creator-orders.component.html',
  styleUrls: ['./creator-orders.component.css']
})
export class CreatorOrdersComponent implements OnInit {

  userType = Type_Of_Account.CreatorContent;

  constructor() { }

  ngOnInit() {
  }

}
