import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-aside-nav-link',
  templateUrl: './aside-nav-link.component.html',
  styleUrls: ['./aside-nav-link.component.css']
})
export class AsideNavLinkComponent implements OnInit {
@Input() Name;
@Input() Icon;
  constructor() { }

  ngOnInit() {
  }

}
