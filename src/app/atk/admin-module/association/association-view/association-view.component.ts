import { Privilege, Privilege_type } from './../../../model/interface';
import { UserSessionService } from './../../../services/app-user-session.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-association-view',
  templateUrl: './association-view.component.html',
  styleUrls: ['./association-view.component.css']
})
export class AssociationViewComponent implements OnInit {

  association = <Privilege>{};
  constructor(private userSession: UserSessionService) { }

  ngOnInit() {
    this.getAssociation();
  }

  getAssociation() {
    this.association = this.userSession.getSessionKey('association');
    console.log(this.association);
  }


  getPrivilegeText(value: number) {
    console.log(value)
    console.log(Privilege_type[value])
    return Privilege_type[value];
  }
}
