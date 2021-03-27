import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../services/checkout/checkout.service';
import { HelperService } from '../../services/helper/helper.service';
import { Router } from '@angular/router';
import { MainserviceService } from '../../services/mainservice/mainservice.service';
import { PopoverpagePage } from '../popoverpage/popoverpage.page';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-confirm2',
  templateUrl: './confirm2.page.html',
  styleUrls: ['./confirm2.page.scss'],
})
export class Confirm2Page implements OnInit {
  payment_methods:any[]
  payment_method:any
  agree:boolean=false
  rules_agree:string
  constructor(private route:Router, private checkout:CheckoutService,
    private popoverController:PopoverController,
    private helper:HelperService,public service:MainserviceService) { }
 
  ngOnInit() {
    this.helper.showSpinner()
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
  setMethod(){
    
  }
  continue(){
        console.log(this.payment_method)
        if(this.agree){
          this.rules_agree="1"
        }else{
          this.rules_agree="0"
        }
      let object= {
            "payment_method": this.payment_method,
            "agree": this.rules_agree,
            "comment": "string"
          }
        this.helper.showSpinner()
        this.checkout.Set_payment_method(object).then(
        (res:any)=>{
          if(res.success==1){ 
            this.route.navigateByUrl('/confirm-tabs/confirm3')
          }
          this.helper.hideSpinner()
        },(err:any)=>{
        this.helper.hideSpinner()
        })
  }

  async presentPopover(ev: Event) {
    this.service.Get_list_of_information().subscribe(
      async (res:any)=>{     
          const popover = await this.popoverController.create({
            component: PopoverpagePage,
            showBackdrop:false,
            event:ev,
            componentProps:{
              'info_id':res.data[1].id
            }
          })
          popover.present()
                        
      },(err:any)=>{

      })
  }
}
