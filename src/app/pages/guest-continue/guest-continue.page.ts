import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { HelperService } from '../../services/helper/helper.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { MainserviceService } from '../../services/mainservice/mainservice.service';
import { PopoverController } from '@ionic/angular';
import { PopoverpagePage } from '../popoverpage/popoverpage.page';
import { TranslateService } from '@ngx-translate/core';
import { CheckoutService } from '../../services/checkout/checkout.service';
@Component({
  selector: 'app-guest-continue',
  templateUrl: './guest-continue.page.html',
  styleUrls: ['./guest-continue.page.scss'],
})
export class GuestContinuePage implements OnInit {
  shipping_methods:any[]
  methods:boolean
  shipping_method:any
  payment_methods:any[]
  payment_method:any
  constructor(public user:UserService,public popoverController: PopoverController, 
    public helper:HelperService,private storage: Storage,private checkout:CheckoutService,
    private route:Router, private location: Location,public service:MainserviceService,
    public formBuilder: FormBuilder,private translate:TranslateService) {}

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
        })

    this.checkout.get_paymentmethods().then(
      (res:any)=>{
        if(res.success==1){
            this.payment_methods=res.data.payment_methods
          this.helper.hideSpinner()
        }   
      },(err:any)=>{
        this.helper.hideSpinner()

      })
  }


  goBack(){
    this.location.back();
  }
 // set shipping method
  setMethod(){
    console.log("chosen shipping method  :  "+ this.shipping_method)
  }

  // set payment method
  setMethod1()
  {
    console.log("chosen payment method  :  "+this.payment_method)
  }

  continue(){

     let shipping_object={
      "shipping_method": this.shipping_method, //"country_zone.country_zone"
      "comment": "my comment"
    }
    this.helper.showSpinner()
    // set shipping method
    this.checkout.Set_shipping_method(shipping_object).then(
    (res:any)=>{
      if(res.success==1){ 

        // set payment method
            let object={
              "payment_method": this.payment_method,
              "agree": true,
              "comment": "string"
            }
            this.checkout.Set_payment_method(object).then(
            (res:any)=>{
              if(res.success==1){ 
                this.route.navigateByUrl('/guest-continue1');
              }
            },(err:any)=>{
            })
      }
      this.helper.hideSpinner()
    },(err:any)=>{
    this.helper.hideSpinner()
    })

  }
}
