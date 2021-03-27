import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../services/checkout/checkout.service';
import { HelperService } from '../../services/helper/helper.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-confirm3',
  templateUrl: './confirm3.page.html',
  styleUrls: ['./confirm3.page.scss'],
})
export class Confirm3Page implements OnInit {
  orderDetails:any={}
  totals:any[]
  products:any[]
  confirm_icon:boolean=false
  constructor(private route:Router,private toastController:ToastController,private storage: Storage,
              private checkout:CheckoutService,private helper:HelperService) { }

  ngOnInit() {
    this.helper.showSpinner()
    this.checkout.confirm().subscribe(
      (res:any)=>{
        if(res.success==1){
          this.orderDetails=res.data
          this.totals=res.data.totals
          this.products=res.data.products
        }
      
        this.helper.hideSpinner()
      },(err:any)=>{
        this.helper.hideSpinner()
      }
    )
  }

   confirm(){
    this.helper.showSpinner()
    this.checkout.confirm_final().subscribe(
      async (res:any)=>{
       if(res.success==1){
         this.helper.hideSpinner()
          //this.helper.presentToastWithOptions('تم تأكيد طلبك')
          this.confirm_icon=true
          setTimeout(()=>{
            this.route.navigateByUrl('/');
            this.storage.remove('Smoky_session')
          },4000)
        
       }
    },(err:any)=>{
      this.helper.hideSpinner()
    })
  }
}
