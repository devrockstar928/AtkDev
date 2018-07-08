import { Component, OnInit } from '@angular/core';
import { Type_Of_Account } from '../../model/interface';

@Component({
  selector: 'app-creator-list',
  templateUrl: './creator-list.component.html',
  styleUrls: ['./creator-list.component.css']
})
export class CreatorListComponent implements OnInit {
  type = Type_Of_Account.CreatorContent;

  constructor() { }

  ngOnInit() {
  }

}
