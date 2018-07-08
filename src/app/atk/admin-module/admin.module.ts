// import { RepEngagementComponent } from './admin-reports/rep-engagement/rep-engagement.component';
import { RepSubscriptionsComponent } from './admin-reports/rep-subscriptions/rep-subscriptions.component';
import { EventsViewComponent } from './events/events-view/events-view.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DataTableModule } from 'primeng/primeng';

import { AtkSharedModule } from './../shared/shared.module';
// import { AdminRoutingModule } from './admin-route';
import { ContentCreatorModule, ContentDecModule } from '../content-creator-module/content-creator.module';
import { UserModule, UserDecModule } from '../user-module/user.module';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ContentCreatorManagerTableComponent } from './content-creator-manager-table/content-creator-manager-table.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { DefaultComponent } from '../../theme/pages/default/default.component';
import { AssociationListComponent } from './association/association-list/association-list.component';
import { AssociationEditComponent } from './association/association-edit/association-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InternalRegisterComponent } from './internal-register/internal-register.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { LevelsListComponent } from './levels/levels-list/levels-list.component';
import { LevelsViewComponent } from './levels/levels-view/levels-view.component';
import { EditBasicInfoComponent } from '../content-creator-module/content-profile/edit-basic-info/edit-basic-info.component';
import { ContentProfileComponent } from '../content-creator-module/content-profile/content-profile/content-profile.component';

import { SkuListComponent } from './sku/sku-list/sku-list.component';
import { SkuViewComponent } from './sku/sku-view/sku-view.component';
import { SkuEditComponent } from './sku/sku-edit/sku-edit.component';
import { OrderViewComponent } from '../user-module/orders/order-view/order-view.component';
import { OrderEditComponent } from '../user-module/orders/order-edit/order-edit.component';
import { UserFeedComponent } from '../user-module/user-feed/user-feed.component';
import { ScreenshotLogsComponent } from './screenshot-logs/screenshot-logs.component';
import { AssociationViewComponent } from './association/association-view/association-view.component';
import { AdminReportsModule } from './admin-reports/admin-reports.module';
// import { RepSalesComponent } from './admin-reports/rep-sales/rep-sales.component';
import { RepAvgRevenueComponent } from './admin-reports/rep-avg-revenue/rep-avg-revenue.component';
import { RepChurnRateComponent } from './admin-reports/rep-churn-rate/rep-churn-rate.component';
import { ContentReportsModule } from '../content-creator-module/content-reports/content-reports.module';
import { ScreenshotLogEditComponent } from './screenshot-logs/screenshot-log-edit/screenshot-log-edit.component';

const appRoutes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: '', redirectTo: 'contents', pathMatch: 'full' },
      { path: 'contents', 'component': ContentCreatorManagerTableComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: 'orders/:id', component: OrderViewComponent },
      { path: 'orders/:id/edit', component: OrderEditComponent },
      // { path: 'feeds', component: UserFeedComponent },

      { path: 'admins/profile/list', component: AdminUserListComponent },
      { path: 'admins/profile/:id/edit', component: EditBasicInfoComponent },
      { path: 'admins/profile/:id/view', component: ContentProfileComponent },

      { path: 'association/:id/view', component: AssociationViewComponent },
      { path: 'association/:id/edit', component: AssociationEditComponent },
      { path: 'association/all', component: AssociationListComponent },

      { path: 'internal/registration', component: InternalRegisterComponent },

      { path: 'events/all', component: EventsListComponent },
      { path: 'events/:id', component: EventsViewComponent },

      { path: 'levels/all', component: LevelsListComponent },
      { path: 'levels/:id', component: LevelsViewComponent },

      { path: 'products', component: SkuListComponent },
      { path: 'products/:id', component: SkuViewComponent },
      { path: 'products/:id/edit', component: SkuEditComponent },
      { path: 'screenshots', component: ScreenshotLogsComponent },

      {
        path: 'reports', children: [
          { path: 'subscriptions', component: RepSubscriptionsComponent },
          { path: 'revenue', component: RepAvgRevenueComponent },
          { path: 'churnrate', component: RepChurnRateComponent },
        ]
      },

    ]
  }
];

@NgModule({
  imports: [
    AtkSharedModule,
    DataTableModule,
    UserDecModule,
    FormsModule,
    ReactiveFormsModule,
    ContentDecModule,
    AdminReportsModule,
    ContentReportsModule,
    RouterModule.forChild(appRoutes),
  ],
  declarations: [
    AdminDashboardComponent,
    ContentCreatorManagerTableComponent,
    AdminOrdersComponent,
    AdminUserListComponent,
    AssociationViewComponent,
    AssociationEditComponent,
    AssociationListComponent,
    InternalRegisterComponent,
    EventsViewComponent,

    LevelsViewComponent,

    ScreenshotLogsComponent,

    ScreenshotLogEditComponent,

  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AdminModule { }
