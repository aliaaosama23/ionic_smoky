import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cartService/cart.service';
import {Location} from '@angular/common';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-useraddresses',
  templateUrl: './useraddresses.page.html',
  styleUrls: ['./useraddresses.page.scss'],
})
export class UseraddressesPage implements OnInit {
  Addresses:any[]=[]
  cartNumber:number
  constructor(private user:UserService,private helper:HelperService,private location:Location,
              private route:Router,private cartService:CartService,public alertController: AlertController,
              private translate:TranslateService) { }

  ngOnInit() {
    this.helper.showSpinner()
    this.user.account_addresses().subscribe(
      (res:any)=>{
        if(res.success==1){
             this.helper.hideSpinner()
             this.Addresses=res.data.addresses
        }
      },(err:any)=>{
        this.helper.hideSpinner()
      }
    )
  }

  ionViewWillEnter() {
    this.helper.showSpinner()
    this.user.account_addresses().subscribe(
      (res:any)=>{
        if(res.success==1){
             this.helper.hideSpinner()
             this.Addresses=res.data.addresses
        }
      },(err:any)=>{
        this.helper.hideSpinner()
      }
    )
  }

  cart(){
   this.route.navigateByUrl('/tabs/cart')
  }

  goBack(){
    this.location.back()
  }

  async delete(addressId){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: this.translate.instant("Do you want to delete address ?"),
      buttons: [
        {
          text: this.translate.instant("cancel"),
          role: 'cancel',
        }, {
          text: this.translate.instant("ok"),
          handler: () => {
            this.helper.showSpinner()
            this.user.delete_address(addressId).subscribe(
              (res:any)=>{
                if(res.success==1){
                   this.helper.hideSpinner()
                   this.user.account_addresses().subscribe(
                    (res:any)=>{
                      if(res.success==1){
                           this.helper.hideSpinner()
                           this.Addresses=res.data.addresses
                      }
                    },(err:any)=>{
                      this.helper.hideSpinner()
                    }
                  )
                }
              },(err:any)=>{
                this.helper.hideSpinner()
              }
            )
          }
        }
      ]
    });

    await alert.present();
   
  }

  edit(addressId){
    this.route.navigateByUrl('/usseraddresses-add-edit/'+addressId)
  }

  addNewAddress(){
    this.route.navigateByUrl('/usseraddresses-add-edit/'+0)
  }
}
