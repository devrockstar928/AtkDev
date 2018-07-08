import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './../../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepSubscriptionsComponent } from './rep-subscriptions/rep-subscriptions.component';
// import { RepSalesComponent } from './rep-sales/rep-sales.component';
import { RepAvgRevenueComponent } from './rep-avg-revenue/rep-avg-revenue.component';
import { RepChurnRateComponent } from './rep-churn-rate/rep-churn-rate.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReportSearchComponent } from './report-search/report-search.component';
import { ReportsHttpService } from '../../content-creator-module/content-reports/reports-http.service';


@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    RepSubscriptionsComponent,
    // RepSalesComponent,
    RepAvgRevenueComponent,
    RepChurnRateComponent,
    ReportSearchComponent
  ],
  exports: [
    RepSubscriptionsComponent,
    // RepSalesComponent,
    RepAvgRevenueComponent,
    RepChurnRateComponent,
  ],
  providers:[
    ReportsHttpService
  ]
})
export class AdminReportsModule { }
