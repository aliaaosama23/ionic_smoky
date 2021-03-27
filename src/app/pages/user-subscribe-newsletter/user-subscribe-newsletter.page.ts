import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cartService/cart.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-user-subscribe-newsletter',
  templateUrl: './user-subscribe-newsletter.page.html',
  styleUrls: ['./user-subscribe-newsletter.page.scss'],
})
export class UserSubscribeNewsletterPage implements OnInit {

  cartNumber:number
 
  constructor(private user:UserService,private helper:HelperService,private location:Location,
              private route:Router,private cartService:CartService) { }

  ngOnInit() {
  }

  goBack(){
    this.location.back()
  }


  cart(){
    this.route.navigateByUrl('/tabs/cart');
  }
}
