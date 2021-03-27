import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { ToastController, MenuController } from '@ionic/angular';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { HelperService } from '../../services/helper/helper.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from 'src/app/services/cartService/cart.service';
@Component({
  selector: 'app-userprofileedit',
  templateUrl: './userprofileedit.page.html',
  styleUrls: ['./userprofileedit.page.scss'],
})
export class UserprofileeditPage implements OnInit {
  cartNumber:number
  loginedIn:boolean
  name:string;
  email:string;
  telephone:number
  public myForm: FormGroup;
  isEditing:boolean=false
  f_name:string;
  l_name:string;
  _email:string;
  _telephone:number
  _fax:string
  constructor(public helper:HelperService,private route:Router, private storage: Storage,
              public service:UserService,private cartService:CartService, 
              private location: Location,private user:UserService,private translate:TranslateService,
              public formBuilder: FormBuilder,public toastController:ToastController ) {}

  ngOnInit() {
    this.cartService.getCountObservable().subscribe(cartItemsNumber=>{
      this.cartNumber=cartItemsNumber
    })

    
    this.myForm = this.formBuilder.group({
      firstname: [ '',  Validators.required],
      lastname: [ '',  Validators.required],
      email: [ '', Validators.compose([Validators.email, Validators.required])],
      telephone: ['',  Validators.required],
      fax:['',  Validators.required]
    });

    this.storage.get('Smoky_loginedIn').then(async (val)=>{
      console.log(val)
     if(val!=null && val==true){  
       this.loginedIn=true
         this.helper.showSpinner()
         this.user.profile().then(
           (res:any)=>{
             if(res.success==1){
               this.f_name=res.data.firstname
               this.l_name=res.data.lastname
               this._email=res.data.email;
               this._telephone=res.data.telephone;
               this._fax=res.data.fax
              this.helper.hideSpinner()
             }        
         },(err:any)=>{
           console.log(err.error.error[0])
           if(err.error.error[0]=="User is not logged in"){
            this.loginedIn=false
           }
          this.helper.hideSpinner()
         })
     }else{
      this.loginedIn=false
      //   const toast = await this.toastController.create({
      //      message:this.translate.instant("you must login"),
      //      position: 'bottom',
      //      duration: 3000,
      //      color:"primary"
      //  });
      //  toast.present();
       
      //  setTimeout(()=>{
      //   this.loginedIn=false
      //  },3002)
     }
   })
  }

  goBack(){
    this.location.back();
  }

  cart(){
   this.route.navigateByUrl('/tabs/cart')
  }

  updateProfile(){
    this.user.profile_Update(this.myForm.value).subscribe((res:any)=>{
      if(res.success==1){
        this.helper.presentToastWithOptions(this.translate.instant("updated successfully"))
          this.isEditing=false 
      }
    })  
  }
  
}

