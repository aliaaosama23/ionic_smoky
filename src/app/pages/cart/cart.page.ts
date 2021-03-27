import { Component, OnInit } from '@angular/core';
import { MainserviceService } from '../../services/mainservice/mainservice.service';
import { HelperService } from '../../services/helper/helper.service';
import { CartService } from '../../services/cartService/cart.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { DataService } from '../../services/dataService/data.service';
import { ToastController, ActionSheetController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  isEditing:boolean=false
  cartProducts:any[]
  cartTotals:any[]
  data:any[]
  cartEmpty:boolean
  constructor(public service:MainserviceService,private router:Router,private translate: TranslateService,
              private dataService: DataService,public toastController: ToastController,public actionSheetController: ActionSheetController,
              private storage: Storage,public cartservice:CartService, public helper:HelperService,
              public alertController: AlertController) { 
    // this.storage.get('Smoky_cartItems').then((val:any)=>{
    //   console.log("items stores"+JSON.stringify(val))
    // })
    this.helper.showSpinner();
    this.cartservice.GetCart(this.helper.Session).subscribe( 
      (res:any)=>{
        if(res.success== 1){
        //  this.data=res.data
          if(res.data.length!=0){
            this.cartEmpty=false
            this.cartProducts=res.data.products
            this.cartTotals=res.data.totals
          }else{
            // this.storage.get('Smoky_cartItems').then(
            //   (val:any)=>{
            //     if(val!=null){
               //    this.cartEmpty=false
            //       this.cartProducts=val
            //          console.log("cart items"+JSON.stringify(val))
            //          this.storage.get('Smoky_cartTotals').then(
            //           (totals:any)=>{
            //             if(totals!=null){
            //                  this.cartTotals=totals
            //                  console.log("cart totals"+JSON.stringify(totals))
            //             }else{
            //             }
            //           }
            //         )
            //     }else{
                   this.cartEmpty=true
            //     }
            //   }
            // )
          }
         
        }
        this.helper.hideSpinner()
      },(err:any)=>{
        this.helper.hideSpinner()
      }
    )
  }

  Add_product_to_wishlist(product_id){
    this.service.Add_product_to_wishlist(product_id).subscribe(
      (res:any)=>{
      console.log(""+JSON.stringify(res))
        if(res.success==1){
          this.helper.presentToastWithOptions(this.translate.instant("product added to wishlist"));
        }
      },(err:any)=>{

      }
    )
  }
  
  ngOnInit() {
    this.helper.showSpinner();
    this.cartservice.GetCart(this.helper.Session).subscribe( 
      (res:any)=>{
        if(res.success== 1){
        //  this.data=res.data
          if(res.data.length!=0){
            this.cartEmpty=false
            this.cartProducts=res.data.products
            this.cartTotals=res.data.totals
          }else{
            // this.storage.get('Smoky_cartItems').then(
            //   (val:any)=>{
            //     if(val!=null){
             //     this.cartEmpty=false
            //       this.cartProducts=val
            //          console.log("cart items"+JSON.stringify(val))
            //          this.storage.get('Smoky_cartTotals').then(
            //           (totals:any)=>{
            //             if(totals!=null){
            //                  this.cartTotals=totals
            //                  console.log("cart totals"+JSON.stringify(totals))
            //             }else{
            //             }
            //           }
            //         )
            //     }else{
                   this.cartEmpty=true
            //     }
            //   }
            // )
          }
         
        }
        this.helper.hideSpinner()
      },(err:any)=>{
        this.helper.hideSpinner()
      }
    )
  }

  increaseQuatity(key,quantity){
    quantity++
    this.cartservice.Update_cart_item_quantity(key,quantity).subscribe(
      (res:any)=>{
         if(res.success==1){
          this.helper.showSpinner();
          this.cartservice.GetCart(this.helper.Session).subscribe( 
            (res:any)=>{
              if(res.success== 1){
                if(res.data.length!=0){
                  this.cartEmpty=false
                  this.cartProducts=res.data.products
                  this.cartTotals=res.data.totals
                }else{
                    this.cartEmpty=true
                }
              }
              this.helper.hideSpinner()
            },(err:any)=>{
              this.helper.hideSpinner()
            }
          )
         }
      },(err:any)=>{

      }
    )

  }

  decreaseQuatity(key,quantity){
      if(quantity>1){
        quantity--
        this.cartservice.Update_cart_item_quantity(key,quantity).subscribe(
          (res:any)=>{
            if(res.success==1){
              this.helper.showSpinner();
              this.cartservice.GetCart(this.helper.Session).subscribe( 
                (res:any)=>{
                  if(res.success== 1){
                    if(res.data.length!=0){
                      this.cartEmpty=false
                      this.cartProducts=res.data.products
                      this.cartTotals=res.data.totals
                    }else{
                        this.cartEmpty=true
                    }
                  }
                  this.helper.hideSpinner()
                },(err:any)=>{
                  this.helper.hideSpinner()
                }
              )
             }
          },(err:any)=>{     
          })
        } 
  }

  productDetails(id,name) {
    this.dataService.setData(id, name);
    this.router.navigateByUrl('/tabs/main/'+id);  
  }

  doRefresh($event){ 
    this.cartservice.GetCart(this.helper.Session).subscribe( 
      (res:any)=>{
        if(res.success== 1){
          if(res.data.length!=0){
            this.cartEmpty=false
            this.cartProducts=res.data.products
            this.cartTotals=res.data.totals
          }else{       
             this.cartEmpty=true
          }
        }
        $event.target.complete();
      },(err:any)=>{
        $event.target.complete();
      })
    }

  async   confirm(){
       this.storage.get('Smoky_loginedIn').then(async (val)=>{
         console.log(val)
        if(val!=null && val==true){  
            this.router.navigateByUrl('/confirm-tabs')   
        }else{
          const actionSheet = await this.actionSheetController.create({
            cssClass: 'my-custom-class',
            buttons: [ {
              text: this.translate.instant("Guest Checkout"),
              handler: () => {
                this.router.navigateByUrl('/guest');
              }
            }, {
              text: this.translate.instant("login/regist"),
              handler: () => {
                this.router.navigateByUrl('/login');
              }
            }, {
              text: this.translate.instant("cancel"),
              icon: 'close',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }]
          });
          await actionSheet.present();
        }
          
      })
    
      
    }
    // goConfirm(){
    //   this.router.navigateByUrl('/tabs/cart/confirm');  
    // }
    EditCart(){
      this.isEditing=true;
    }

    saveCart(){
      this.isEditing=false;
    }

   async removeItem(key){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        message: this.translate.instant("Do you want to remove product from cart ?"),
        buttons: [
          {
            text: this.translate.instant('cancel'),
            role: 'cancel',
          }, {
            text:  this.translate.instant('okay'),
            handler: () => {
              this.cartservice.decreaseProduct();
              this.cartservice.Remove_item_from_cart(key).subscribe(
                (res:any)=>{
         
                 if(res.success==1){
                   this.helper.showSpinner();
                   this.cartservice.GetCart(this.helper.Session).subscribe( 
                     (res:any)=>{
                       if(res.success== 1){
                         if(res.data.length!=0){
                           this.cartEmpty=false
                           this.cartProducts=res.data.products
                           this.cartTotals=res.data.totals
                         }else{       
                            this.cartEmpty=true
                         }
                       }
                       this.helper.hideSpinner()
                     },(err:any)=>{
                       this.helper.hideSpinner()
                     })
                 }
                },(err:any)=>{
         
                }
              )
            }
          }
        ]
      });
  
      await alert.present();

     
    }
}
