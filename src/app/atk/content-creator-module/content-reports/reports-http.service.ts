import { SearchModel } from './../../model/interface';
import { Injectable } from '@angular/core';
import { CONFIG } from '../../services/config.service';
import { HttpGeneralService } from '../../services/http-general.service';

const reportsUrl = CONFIG.baseUrls.reports;
@Injectable()
export class ReportsHttpService {

  constructor(private httpSer: HttpGeneralService) { }


  //#region content creator reports

  getRefundSummaryRep(searchOb?: SearchModel) {
    // localhost:5000/reports/tier/48?dt=c_at&ds=2018-02-01&de=2018-03-01
    // cc?, tpye?, dt?, ds?, de?, p?, l?
    let url = `${reportsUrl}/tier?`;

    // url = searchOb.cc ? `${url}&cc=${searchOb.cc}` : url;
    // url = searchOb.type ? `${url}&t=${searchOb.type}` : url;
    url = searchOb.dateRangeType ? `${url}&dt=${searchOb.dateRangeType}` : url;
    url = searchOb.startDate ? `${url}&ds=${this.setDateScheme(searchOb.startDate)}` : url;
    url = searchOb.endDate ? `${url}&de=${this.setDateScheme(searchOb.endDate)}` : url;

    return this.httpSer.get(url);
  }

  getPledgeGrowthRep(searchOb: SearchModel) {
    // localhost:5000/reports/pledge_growth?dt=c_at&ds=2018-02-01&de=2018-05-01
    // cc?, tpye?, dt?, ds?, de?, p?, l?
    let url = `${reportsUrl}/pledge_growth?`;

    // url = searchOb.cc ? `${url}&cc=${searchOb.cc}` : url;
    // url = searchOb.type ? `${url}&t=${searchOb.type}` : url;
    url = searchOb.dateRangeType ? `${url}&dt=${searchOb.dateRangeType}` : url;
    url = searchOb.startDate ? `${url}&ds=${this.setDateScheme(searchOb.startDate)}` : url;
    url = searchOb.endDate ? `${url}&de=${this.setDateScheme(searchOb.endDate)}` : url;

    return this.httpSer.get(url);
  }

  //#endregion

  //#region admin reports
  getSubscriptionsRep(searchOb: SearchModel) {
    // cc?, tpye?, dt?, ds?, de?, p?, l?
    let url = `${reportsUrl}/subscriptions?`;

    url = searchOb.cc ? `${url}&cc=${searchOb.cc}` : url;
    url = searchOb.type ? `${url}&t=${searchOb.type}` : url;
    url = searchOb.dateRangeType ? `${url}&dt=${searchOb.dateRangeType}` : url;
    url = searchOb.startDate ? `${url}&ds=${this.setDateScheme(searchOb.startDate)}` : url;
    url = searchOb.endDate ? `${url}&de=${this.setDateScheme(searchOb.endDate)}` : url;
    url = searchOb.length ? `${url}&l=${searchOb.length}` : url;
    url = searchOb.page ? `${url}&p=${searchOb.page}` : url;

    return this.httpSer.get(url);
  }

  getSalesRep(searchOb: SearchModel) {

    let url = `${reportsUrl}/sales_totals?`;

    url = searchOb.cc ? `${url}&cc=${searchOb.cc}` : url;
    url = searchOb.type ? `${url}&t=${searchOb.type}` : url;
    // url = searchOb.dateRangeType ? `${url}&dt=${searchOb.dateRangeType}` : url;
    url = searchOb.startDate ? `${url}&dsm=${searchOb.startDate}` : url;
    url = searchOb.endDate ? `${url}&dem=${searchOb.endDate}` : url;
    url = searchOb.yearFrom ? `${url}&dsy=${searchOb.yearFrom}` : url;
    url = searchOb.yearTo ? `${url}&dey=${searchOb.yearTo}` : url;

    return this.httpSer.get(url);
    // return this.httpSer.get(`${reportsUrl}/sales_totals?${querysting}`);
  }

  getAvgRevenueRep(searchOb: SearchModel) {
    let url = `${reportsUrl}/avg_revenue?`;

    url = searchOb.cc ? `${url}&cc=${searchOb.cc}` : url;
    url = searchOb.dateRangeType ? `${url}&dt=${searchOb.dateRangeType}` : url;
    url = searchOb.startDate ? `${url}&dsm=${searchOb.startDate}` : url;
    url = searchOb.endDate ? `${url}&dem=${searchOb.endDate}` : url;
    url = searchOb.yearFrom ? `${url}&dsy=${searchOb.yearFrom}` : url;
    url = searchOb.yearTo ? `${url}&dey=${searchOb.yearTo}` : url;
    url = searchOb.length ? `${url}&l=${searchOb.length}` : url;
    url = searchOb.page ? `${url}&p=${searchOb.page}` : url;

    return this.httpSer.get(url);
  }

  getChurnRateRep(searchOb: SearchModel) {
    let url = `${reportsUrl}/churn_rate?`;

    url = searchOb.cc ? `${url}&cc=${searchOb.cc}` : url;
    // url = searchOb.dateRangeType ? `${url}&dt=${searchOb.dateRangeType}` : url;
    url = searchOb.yearFrom ? `${url}&dsy=${searchOb.yearFrom}` : url;
    url = searchOb.startDate ? `${url}&dsm=${searchOb.startDate}` : url;
    url = searchOb.yearTo ? `${url}&dey=${searchOb.yearTo}` : url;
    url = searchOb.endDate ? `${url}&dem=${searchOb.endDate}` : url;

    return this.httpSer.get(url);
  }

  getEngagementRep(searchOb: SearchModel) {
    let url = `${reportsUrl}/engagement?`;

    url = searchOb.cc ? `${url}&cc=${searchOb.cc}` : url;
    url = searchOb.dateRangeType ? `${url}&dt=${searchOb.dateRangeType}` : url;
    url = searchOb.startDate ? `${url}&ds=${this.setDateScheme(searchOb.startDate)}` : url;
    url = searchOb.endDate ? `${url}&de=${this.setDateScheme(searchOb.endDate)}` : url;

    return this.httpSer.get(url);
  }

  getTierGrowthRep(tierid, searchObj: SearchModel) {

    let url = `${reportsUrl}/tier/${tierid}?`;

    url = searchObj.cc ? `${url}&cc=${searchObj.cc}` : url;
    url = searchObj.dateRangeType ? `${url}&dt=${searchObj.dateRangeType}` : url;
    url = searchObj.startDate ? `${url}&ds=${this.setDateScheme(searchObj.startDate)}` : url;
    url = searchObj.endDate ? `${url}&de=${this.setDateScheme(searchObj.endDate)}` : url;

    return this.httpSer.get(url);
  }

  //#endregion

  setDateScheme(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}
