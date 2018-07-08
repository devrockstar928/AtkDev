import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import "froala-editor/js/froala_editor.pkgd.min.js";
import * as $ from 'jquery';
window["$"] = $;
window["jQuery"] = $;


import { ContentReportsModule } from './content-reports/content-reports.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule, UserDecModule } from './../user-module/user.module';
import { ManagerListComponent } from './manager-list/manager-list.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { TiersManageComponent } from './tiers/tiers-manage/tiers-manage.component';
import { CreatorFeedComponent } from './creator-feed/creator-feed.component';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { AtkSharedModule } from '../shared/shared.module';
import { LayoutModule } from '../../theme/layouts/layout.module';
import { DataTableModule, AutoCompleteModule } from 'primeng/primeng';
import { TiersListComponent } from './tiers/tiers-list/tiers-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TiersAddComponent } from './tiers/tiers-add/tiers-add.component';
import { ContentAddComponent } from './content-add/content-add.component';
import { FileSelectDirective, FileUploadModule } from 'ng2-file-upload';
import { fakeBackendProvider } from '../../auth/_helpers/index';
import { ContentProfileComponent } from './content-profile/content-profile/content-profile.component';
// import { ContentProfileModule } from './content-profile/content-profile.module';
import { ContentCreatorDb } from '../../server-data/content-profileDb';
import { CreatorProfileListComponent } from './content-profile/creator-profile-list/creator-profile-list.component';
import { CreatorOrdersComponent } from './creator-orders/creator-orders.component';
import { MaterialModule } from '../../material/material.module';
import { UserAddComponent } from './users/user-add/user-add.component';
import { CreatorListComponent } from './creator-list/creator-list.component';
import { EditBasicInfoComponent } from './content-profile/edit-basic-info/edit-basic-info.component';
import { UserFeedComponent } from '../user-module/user-feed/user-feed.component';
import { OrderViewComponent } from '../user-module/orders/order-view/order-view.component';
import { OrderEditComponent } from '../user-module/orders/order-edit/order-edit.component';
import { SkuListComponent } from '../admin-module/sku/sku-list/sku-list.component';
import { SkuEditComponent } from '../admin-module/sku/sku-edit/sku-edit.component';
import { SkuViewComponent } from '../admin-module/sku/sku-view/sku-view.component';
import { BasicInfoComponent } from './content-profile/basic-info/basic-info.component';
import { OrderHistoryComponent } from './content-profile/order-history/order-history.component';
import { SubHistoryComponent } from './content-profile/sub-history/sub-history.component';
import { LikeHistoryComponent } from './content-profile/like-history/like-history.component';
import { CommentHistoryComponent } from './content-profile/comment-history/comment-history.component';
import { TrophiesComponent } from './content-profile/trophies/trophies.component';
import { PostedContentComponent } from './content-profile/posted-content/posted-content.component';
import { ProfileCommentComponent } from './content-profile/profile-comment/profile-comment.component';
import { ProfileStreamComponent } from './content-profile/profile-stream/profile-stream.component';
import { EventsListComponent } from '../admin-module/events/events-list/events-list.component';
import { LevelsListComponent } from '../admin-module/levels/levels-list/levels-list.component';
import { SubscriberComponent } from './users/subscriber/subscriber.component';
import { ContentDetailComponent } from './content-profile/content-detail/content-detail.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { UserProfileComponent } from '../user-module/user-header/user-profile/user-profile.component';
import { SubscriberProfileComponent } from '../user-module/user-profile/subscriber-profile/subscriber-profile.component';
import { EditContentComponent } from './edit-content/edit-content.component';
import { TiersHttpService } from './tiers/tiers-http.service';
import { RepPledgeGrowthComponent } from './content-reports/rep-pledge-growth/rep-pledge-growth.component';
import { RepRefundSummaryComponent } from './content-reports/rep-refund-summary/rep-refund-summary.component';
import { RepSalesComponent } from '../admin-module/admin-reports/rep-sales/rep-sales.component';
import { RepTierGrowthComponent } from './content-reports/rep-tier-growth/rep-tier-growth.component';
import { RepEngagementComponent } from './content-reports/rep-engagement/rep-engagement.component';

const appRoutes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: '', redirectTo: 'tiers', pathMatch: 'full' },
      { path: 'tiers', component: TiersListComponent },
      { path: 'tier/:id', component: TiersAddComponent },

      { path: 'post/add', component: ContentAddComponent },
      { path: 'post/:id/edit', component: EditContentComponent },
      // { path: 'feeds', 'component': UserFeedComponent },


      { path: 'creators/profile/list', component: CreatorListComponent },
      { path: 'creators/profile/:id/edit', component: EditBasicInfoComponent },
      { path: 'creators/profile/:id/view', component: ContentProfileComponent },

      { path: 'managers/profile/list', component: ManagerListComponent },
      { path: 'managers/profile/:id/edit', component: EditBasicInfoComponent },
      { path: 'managers/profile/:id/view', component: ContentProfileComponent },

      { path: 'subscriber', component: SubscriberComponent },

      { path: 'users/profile/list', component: UsersListComponent },
      { path: 'users/profile/:id/edit', component: EditBasicInfoComponent },
      { path: 'users/profile/:id/view', component: UserProfileComponent },
      { path: 'subscriber/profile/:id/view', component: SubscriberProfileComponent },


      { path: 'orders', component: CreatorOrdersComponent },
      { path: 'orders/:id', component: OrderViewComponent },
      { path: 'orders/:id/edit', component: OrderEditComponent },

      { path: 'products', component: SkuListComponent },
      { path: 'products/:id', component: SkuViewComponent },
      { path: 'products/:id/edit', component: SkuEditComponent },


      { path: 'reports/pledgegrowth', component: RepPledgeGrowthComponent },
      { path: 'reports/refundsummary', component: RepRefundSummaryComponent },
      { path: 'reports/sales', component: RepSalesComponent },
      { path: 'reports/tiergrowth', component: RepTierGrowthComponent },
      { path: 'reports/engagement', component: RepEngagementComponent },


    ]
  }
];

@NgModule({
  imports: [
    AtkSharedModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    FileUploadModule,
    ContentReportsModule,
    // ContentProfileModule,
    UserDecModule,
    RouterModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    OverlayModule
  ],
  declarations: [
    TiersListComponent,
    TiersAddComponent,
    ContentAddComponent,
    CreatorOrdersComponent,
    CreatorFeedComponent,
    TiersManageComponent,
    CreatorListComponent,
    UsersListComponent,
    UserAddComponent,
    ManagerListComponent,
    SkuListComponent,
    SkuViewComponent,
    SkuEditComponent,
    ContentProfileComponent,
    BasicInfoComponent,
    OrderHistoryComponent,
    SubHistoryComponent,
    LikeHistoryComponent,
    CommentHistoryComponent,
    TrophiesComponent,
    PostedContentComponent,
    ProfileCommentComponent,
    ProfileStreamComponent,
    CreatorProfileListComponent,
    EditBasicInfoComponent,
    EventsListComponent,
    LevelsListComponent,
    SubscriberComponent,
    ContentDetailComponent,
    EditContentComponent
  ],
  exports: [
    UsersListComponent,
    UserAddComponent,
    SkuListComponent,
    SkuViewComponent,
    SkuEditComponent,
    EventsListComponent,
    LevelsListComponent,
  ],
  providers: [
    TiersHttpService,
  ],
  entryComponents: [
    ContentDetailComponent
  ]
})
export class ContentDecModule { }

@NgModule({
  imports: [
    ContentDecModule,
    RouterModule.forChild(appRoutes),
  ],
  declarations: [
  ],
  exports: [
    RouterModule,
  ],
  providers: [
  ]
})
export class ContentCreatorModule { }



