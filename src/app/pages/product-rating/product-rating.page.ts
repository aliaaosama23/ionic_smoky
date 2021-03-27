import { Component, OnInit } from '@angular/core';
import { MainserviceService } from '../../services/mainservice/mainservice.service';
import { CartService } from '../../services/cartService/cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-product-rating',
  templateUrl: './product-rating.page.html',
  styleUrls: ['./product-rating.page.scss'],
})
export class ProductRatingPage implements OnInit {
  cartNumber:number
  public myForm: FormGroup;
  name:any
  text:any
  productId:any
  productname:any
  constructor(private service:MainserviceService,private cartservice:CartService,public formBuilder: FormBuilder,
              private router:Router,private location: Location,private activatedRoute: ActivatedRoute,
              private translate:TranslateService,public toastController: ToastController) { 
                this.productId = this.activatedRoute.snapshot.paramMap.get('id');

                if (this.activatedRoute.snapshot.data['data']) {
                  this.productname = this.activatedRoute.snapshot.data['data'];
                  console.log("name"+this.productname)
                }
                  this.cartservice.getCountObservable().subscribe( cartItemsNumber=>
                    this.cartNumber=cartItemsNumber
                  )
  
                  this.myForm = formBuilder.group({
                    name:['', Validators.required],
                    text: ['', Validators.required],
                    rating: ['',  Validators.required]
                  });
                  this.name=this.translate.instant("name")
                  this.text=this.translate.instant("text")
  }
 
  ngOnInit() {
  }

  logRatingChange(rating){
    console.log("changed rating: ",rating);
  }

 async productRate(){

   this.service.ProductsReview(this.productId, this.myForm.value).then(
      async (res:any)=>{
        console.log(JSON.stringify(res))
         if(res.success==1){
          const toast = await this.toastController.create({
            message: this.translate.instant("Your review was sent successfully"),
            position: 'bottom',
            duration: 3000,
            color:"primary"
          });
          toast.present();
          toast.onDidDismiss().then(()=>{
            this.location.back();
          })
           
         
         
         }
      },(err:any)=>{
        console.log(JSON.stringify(err))
      }
   )
  }

  cart(){
    this.router.navigateByUrl('/tabs/cart');
   }
 
   goBack(){
     this.location.back();
   }
}
