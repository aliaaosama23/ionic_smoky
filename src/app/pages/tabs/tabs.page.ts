import { Component } from '@angular/core';
import { CartService } from '../../services/cartService/cart.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  cartNumber:number
  constructor(private cartservice:CartService) {

    this.cartservice.getCountObservable().subscribe(res=>{
      console.log("cart  :  "+res);
      this.cartNumber=res;
    })
  }



}
