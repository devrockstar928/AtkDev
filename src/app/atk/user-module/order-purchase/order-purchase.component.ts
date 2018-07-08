import { ServerHttpService } from './../../services/server-http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkuPurchase } from '../../model/interface';

@Component({
  selector: 'app-order-purchase',
  templateUrl: './order-purchase.component.html',
  styleUrls: ['./order-purchase.component.css']
})
export class OrderPurchaseComponent implements OnInit {


  newOrder = <SkuPurchase>{};

  constructor(private serHttp: ServerHttpService,
    private route: ActivatedRoute) { }

  ngOnInit() {

  }

  postOrder(userId: number) {

  }
}
