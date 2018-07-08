import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepPledgeGrowthComponent } from './rep-pledge-growth/rep-pledge-growth.component';
import { RepRefundSummaryComponent } from './rep-refund-summary/rep-refund-summary.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MaterialModule } from '../../../material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReportsHttpService } from './reports-http.service';
import { RepSalesComponent } from '../../admin-module/admin-reports/rep-sales/rep-sales.component';
import { RepTierGrowthComponent } from './rep-tier-growth/rep-tier-growth.component';
import { RepEngagementComponent } from './rep-engagement/rep-engagement.component';

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    RepRefundSummaryComponent,
    RepPledgeGrowthComponent,
    RepEngagementComponent,
    RepSalesComponent,
    RepTierGrowthComponent
  ],
  exports: [
    RepEngagementComponent,
    RepSalesComponent
  ],
  providers: [
    ReportsHttpService
  ]
})
export class ContentReportsModule { }
