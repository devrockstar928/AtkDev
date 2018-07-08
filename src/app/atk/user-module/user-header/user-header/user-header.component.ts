import { User } from './../../../../auth/_models/user';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../auth/_services/authentication.service';
import { UserSessionService } from '../../../services/app-user-session.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {

  currentUser;
  constructor(private authSer: AuthenticationService) { }

  ngOnInit() {
    this.currentUser = this.authSer.getCurrentUser();
  }

  // openSidebar(event){
  //   (<any>$('#m_quick_sidebar_toggle')) ? (<any>$('#m_quick_sidebar_toggle')).click() : undefined;
    
  // }
}
