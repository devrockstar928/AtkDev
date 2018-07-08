import { Privilege, Type_Of_Account, Privilege_type, User_Session_Keys } from './../../model/interface';
import { UserSessionService } from './../../services/app-user-session.service';
import { AuthenticationService } from './../../../auth/_services/authentication.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-add-button-actions',
  templateUrl: './add-button-actions.component.html',
  styleUrls: ['./add-button-actions.component.css']
})
export class AddButtonActionsComponent implements OnInit {


  userType;
  association: Privilege;
  isNoPrivilege = false;
  @Input() privilegeValue;
  @Input() class;
  @Input() text;
  @Output() click = new EventEmitter<any>();
  constructor(private authSer: AuthenticationService
    , private userSssion: UserSessionService) {
    this.userType = this.authSer.CurrentUserType;
  }

  ngOnInit() {
    if (this.userType == Type_Of_Account.CreatorManager) {
      this.association = this.userSssion.getSessionKey(User_Session_Keys.Managed_User);
      if (!this.association || !this.association.privileges || this.association.privileges[this.privilegeValue] < Privilege_type.CREATE) {
        this.isNoPrivilege = true;
      }
    }
  }

  onClick() {
    this.click.emit(true);
  }

}