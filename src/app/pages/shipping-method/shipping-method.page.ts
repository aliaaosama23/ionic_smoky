import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../services/checkout/checkout.service';
import { HelperService } from '../../services/helper/helper.service';
import { Location } from "@angular/common";
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping-method',
  templateUrl: './shipping-method.page.html',
  styleUrls: ['./shipping-method.page.scss'],
})
export class ShippingMethodPage implements OnInit {
  shipping_methods:any[]
  methods:boolean
  shipping_method:any
  constructor(private checkout:CheckoutService,private route:Router, 
              private location: Location,private helper:HelperService) { }

  ngOnInit() {
    this.checkout.Get_shipping_methods().then(
      (res:any)=>{
        this.helper.hideSpinner()
        if(res.success==1){
          this.shipping_methods=res.data.shipping_methods
          this.methods=true
        }else{
          this.methods=false           
        }
      },(err:any)=>{
        this.helper.hideSpinner()
        this.methods=false       
        //this.shipping_methods_error_Msg  = err.error.error[0]
      }
    )
  }

  goBack(){
    this.location.back();
  }

  setMethod(){
    console.log(this.shipping_method)
    let object={
      "shipping_method":  this.shipping_method,
      "comment": "my comment"
    }
    this.helper.showSpinner()
    this.checkout.Set_shipping_method(object).then(
    (res:any)=>{
      if(res.success==1){ 
        this.route.navigateByUrl('/confirm-tabs/confirm2')
      }
      this.helper.hideSpinner()
    },(err:any)=>{
    this.helper.hideSpinner()
    })


  }

  setShipping(){
    this.route.navigateByUrl('/confirm-tabs/confirm2')
  }

}
