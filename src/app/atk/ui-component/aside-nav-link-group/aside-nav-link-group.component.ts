import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-aside-nav-link-group',
  templateUrl: './aside-nav-link-group.component.html',
  styleUrls: ['./aside-nav-link-group.component.css']
})
export class AsideNavLinkGroupComponent implements OnInit {
  @Input() routerLink;
  @Input() LinkName;
  constructor() { }

  ngOnInit() {
  }

}
