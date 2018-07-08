import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Privilege, Type_Of_Account, User_Session_Keys, Privilege_type } from '../../model/interface';
import { AuthenticationService } from '../../../auth/_services';
import { UserSessionService } from '../../services/app-user-session.service';

@Component({
  selector: 'app-component-acitons',
  templateUrl: './component-acitons.component.html',
  styleUrls: ['./component-acitons.component.css']
})
export class ComponentAcitonsComponent implements OnInit {

  userType;
  // association: Privilege;
  actionsButton: ComponentActions[] = [];
  @Input() actions = [];
  @Input() privilegeValue;
  @Input() class;
  @Input() text;
  @Output() click = new EventEmitter<any>();
  constructor(private authSer: AuthenticationService
    , private userSssion: UserSessionService) {
    this.userType = this.authSer.CurrentUserType;
  }

  ngOnInit() {
    // if (this.userType == Type_Of_Account.CreatorManager) {
    //   this.association = this.userSssion.getSessionKey(User_Session_Keys.Managed_User);
    // }
    this.setActionButtons();
  }

  setActionButtons() {
    this.actions.forEach(element => {
      let item: ComponentActions;
      switch (element) {
        case 1:
          item = { isHavePrivilege: true, class: '', value: 1, icon: 'eye', text: 'View' };
          item.isHavePrivilege = this.checkPrivileg(Privilege_type.READ);
          break;
        case 2:
          item = { isHavePrivilege: true, class: 'text-primary', value: 2, icon: 'edit', text: 'Edit' };
          item.isHavePrivilege = this.checkPrivileg(Privilege_type.UPDATE);
          break;
        case 4:
          item = { isHavePrivilege: true, class: 'text-danger', value: 4, icon: 'trash', text: 'Delete' };
          item.isHavePrivilege = this.checkPrivileg(Privilege_type.DELETE);
          break;
        default:
          break;
      }
      if (item.isHavePrivilege) {
        this.actionsButton.push(item);
      }
    });
  }

  checkPrivileg(privilege): boolean {
    let flag = true;
    if (this.userType == Type_Of_Account.CreatorManager) {
      const c = <Privilege>this.userSssion.getSessionKey(User_Session_Keys.Managed_User);
      if (!c || !c.privileges || c.privileges[this.privilegeValue] < privilege) {
        flag = false;
      }
    }
    return flag;
  }
  onClick(action) {
    this.click.emit(action);
  }

}


export interface ComponentActions {
  isHavePrivilege: boolean;
  class: string;
  value: number;
  icon: string;
  text: string;
}
