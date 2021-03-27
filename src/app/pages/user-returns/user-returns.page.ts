import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cartService/cart.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-user-returns',
  templateUrl: './user-returns.page.html',
  styleUrls: ['./user-returns.page.scss'],
})
export class UserReturnsPage implements OnInit {
  cartNumber:number
  MyReturns:any[]=[]
  constructor(private user:UserService,private helper:HelperService,private location:Location,
              private route:Router,private cartService:CartService) { }

  ngOnInit() {
    this.cartService.getCountObservable().subscribe(cartItemsNumber=>{
      this.cartNumber=cartItemsNumber
    })

    this.helper.showSpinner()
    this.user.returns().subscribe(
      (res:any)=>{
        if(res.success==1){
          this.helper.hideSpinner()
          this.MyReturns=res.data
        }
      },(err:any)=>{

      }
    )

  }

  goBack(){
    this.location.back()
  }


  cart(){
    this.route.navigateByUrl('/tabs/cart');
  }


}
