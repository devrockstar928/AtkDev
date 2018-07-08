// import { ManagerListComponent } from './manager-list/manager-list.component';
// import { UsersListComponent } from './users/users-list/users-list.component';
// import { TiersManageComponent } from './tiers/tiers-manage/tiers-manage.component';
// import { CreatorFeedComponent } from './creator-feed/creator-feed.component';
// import { UserModule } from './../user-module/user.module';
// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Routes, RouterModule } from '@angular/router';
// import { DefaultComponent } from '../../theme/pages/default/default.component';
// import { AtkSharedModule } from '../shared/shared.module';
// import { LayoutModule } from '../../theme/layouts/layout.module';
// import { DataTableModule, AutoCompleteModule } from 'primeng/primeng';
// import { TiersListComponent } from './tiers/tiers-list/tiers-list.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { TiersAddComponent } from './tiers/tiers-add/tiers-add.component';
// import { ContentAddComponent } from './content-add/content-add.component';
// import { FileSelectDirective, FileUploadModule } from 'ng2-file-upload';
// import { fakeBackendProvider } from '../../auth/_helpers/index';
// import { ContentProfileComponent } from './content-profile/content-profile/content-profile.component';
// // import { ContentProfileModule } from './content-profile/content-profile.module';
// import { ContentCreatorDb } from '../../server-data/content-profileDb';
// import { CreatorProfileListComponent } from './content-profile/creator-profile-list/creator-profile-list.component';
// import { CreatorOrdersComponent } from './creator-orders/creator-orders.component';
// import { MaterialModule } from '../../material/material.module';
// import { UserAddComponent } from './users/user-add/user-add.component';
// import { CreatorListComponent } from './creator-list/creator-list.component';
// import { EditBasicInfoComponent } from './content-profile/edit-basic-info/edit-basic-info.component';
// const appRoutes: Routes = [
//   {
//     path: '',
//     component: DefaultComponent,
//     children: [
//       { path: '', redirectTo: 'tiers', pathMatch: 'full' },
//       { path: 'tiers', component: TiersListComponent },
//       { path: 'tier/:id', component: TiersAddComponent },
//       { path: 'post/add', component: ContentAddComponent },

//       { path: 'creators/profile/list', component: CreatorListComponent },
//       { path: 'creators/profile/:id/edit', component: EditBasicInfoComponent },
//       { path: 'creators/profile/:id/view', component: ContentProfileComponent },

//       { path: 'managers/profile/list', component: ManagerListComponent },
//       { path: 'managers/profile/:id/edit', component: EditBasicInfoComponent },
//       { path: 'managers/profile/:id/view', component: ContentProfileComponent },

//       { path: 'users/profile/list', component: UsersListComponent },
//       { path: 'users/profile/:id/edit', component: EditBasicInfoComponent },
//       { path: 'users/profile/:id/view', component: ContentProfileComponent },


//       { path: 'orders/list', component: CreatorOrdersComponent },

//     ]
//   }
// ];

// @NgModule({
//   imports: [
//     AtkSharedModule,
//     LayoutModule,
//     FormsModule,
//     ReactiveFormsModule,
//     AutoCompleteModule,
//     FileUploadModule,
//     // ContentProfileModule,
//     UserModule,
//   ],
//   declarations: [
//     TiersListComponent,
//     TiersAddComponent,
//     ContentAddComponent,
//     CreatorOrdersComponent,
//     CreatorFeedComponent,
//     TiersManageComponent,
//     CreatorListComponent,
//     UsersListComponent,
//     UserAddComponent,
//     ManagerListComponent
//   ],
//   exports: [
//     UsersListComponent,
//     UserAddComponent
//   ],
//   providers: [
//      fakeBackendProvider,
//     ContentCreatorDb
//   ]
// })
// export class ContentDecModule { }

// @NgModule({
//   imports: [
//     ContentDecModule,
//     RouterModule.forChild(appRoutes),
//   ],
//   declarations: [
//   ],
//   exports: [
//      RouterModule,
//   ],
//   providers: [
//   ]
// })
// export class ContentCreatorModule { }



