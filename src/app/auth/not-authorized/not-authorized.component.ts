import { Routes, RouterModule } from '@angular/router';
import { Component, OnInit, NgModule } from '@angular/core';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../../theme/layouts/layout.module';

@Component({
  selector: 'app-not-authorized',
  templateUrl: './not-authorized.component.html',
  styleUrls: ['./not-authorized.component.css']
})
export class NotAuthorizedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

const routes: Routes = [
  {
    'path': '',
    'component': DefaultComponent,
    'children': [
      {
        'path': '',
        'component': NotAuthorizedComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
  ], exports: [
    RouterModule,
  ], declarations: [
    NotAuthorizedComponent,
  ],
})
export class NotAuthorizedModule {
}
