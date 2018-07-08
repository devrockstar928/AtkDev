import { Subject } from 'rxjs/Subject';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User, SearchModel, Type_Of_Account, ChartMatrix } from '../../../model/interface';
import { FormControl } from '@angular/forms';
import { ReportsHttpService } from '../reports-http.service';
import { ServerHttpService } from '../../../services/server-http.service';

@Component({
  selector: 'app-rep-pledge-growth',
  templateUrl: './rep-pledge-growth.component.html',
  styleUrls: ['./rep-pledge-growth.component.css']
})
export class RepPledgeGrowthComponent implements OnInit {
  // *****************************************************

  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  multi: ChartMatrix[] = []

  view: any[] = [400];


  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  // ******************************************************
  searchObj: SearchModel = {};

  resultData: RepPledgeGrowth;

  private ngUnsubscribe = new Subject<void>(); // for unscubscribe any observer before destroy component
  constructor(private repHttp: ReportsHttpService,
    private httpSer: ServerHttpService) { }

  ngOnInit() {
    this.view.unshift(document.getElementById('chartDiv').clientWidth);
  }

  search() {
    this.getPledgeGrowthRep(this.searchObj)
  }

  getPledgeGrowthRep(obj?) {
    this.repHttp.getPledgeGrowthRep(obj).subscribe(res => {
      console.log(res);
      if (res.type == 'Success') {
        this.resultData = res.data;
        this.setDataToMaterix();
        // this.dataSource.data = this.resultData;
      }
    });
  }

  setDataToMaterix() {
    this.multi = [];
    if (this.resultData.newSubscribers.length > 0) {
      this.resultData.newSubscribers.forEach(item => {
        const d = this.multi.find(ele => this.setXFormatting(item.date_trunc) == ele.name);
        if (d) {
          d.series.push({ name: 'New And Increased Pledges', value: item.count });
        } else {
          this.multi.push({ name: this.setXFormatting(item.date_trunc), series: [{ name: 'New And Increased Pledges', value: item.count }] });
        }
      })
    }
    if (this.resultData.deletedSubscritions.length > 0) {
      this.resultData.deletedSubscritions.forEach(item => {
        const d = this.multi.find(ele => this.setXFormatting(item.date_trunc) == ele.name);
        if (d) {
          d.series.push({ name: 'Deleted And Decreased Pledges', value: item.count });
        } else {
          this.multi.push({ name: this.setXFormatting(item.date_trunc), series: [{ name: 'Deleted And Decreased Pledges', value: item.count }] });
        }
      })
      // const delsub: ChartMatrix = { name: 'deletedSubscritions', series: <any>[] };
      // this.resultData.newSubscribers.forEach(item => {
      //   delsub.series.push(this.addSeries(item));
      // })
      // this.multi.push(delsub);
    }
    if (this.resultData.totalSubscribersRevenue.length > 0) {
      this.resultData.totalSubscribersRevenue.forEach(item => {
        const keys = Object.keys(item);
        const d = this.multi.find(ele => this.generateTotalName(keys[0]) == ele.name);
        if (d) {
          d.series.push({ name: 'Amount Pledged', value: item[keys[0]] });
        } else {
          this.multi.push({ name: this.generateTotalName(keys[0]), series: [{ name: 'Amount Pledged', value: item[keys[0]] }] });
        }
      })
      // const total: ChartMatrix = { name: 'totalSubscribersRevenue', series: <any>[] };
      // this.resultData.newSubscribers.forEach(item => {
      //   total.series.push(this.addSeries(item));
      // })
      // this.multi.push(total);
    }
  }
  generateTotalName(month) {
    return new Date(this.searchObj.startDate.getFullYear(), month - 1, 1).toLocaleDateString();

  }
  getMonthName(item) {
    const keys = Object.keys(item);
    return this.monthNames[parseInt(keys[0]) - 1];
  }
  getMonthValue(item) {
    const keys = Object.keys(item);
    return item[keys[0]];
  }
  onSelect(event) {
    console.log(event);
  }

  addSeries(item) {
    return { name: item.date_trunc ? this.setXFormatting(item.date_trunc) : undefined, value: item.count ? item.count : '0' }
  }
  setXFormatting(date) {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).toLocaleDateString();
  }

}

interface RepPledgeGrowth {
  deletedSubscritions?: { count: number; date_trunc: string }[];
  newSubscribers?: { count: number; date_trunc: string }[];
  totalSubscribersRevenue?: { [key: number]: number }[];
}


