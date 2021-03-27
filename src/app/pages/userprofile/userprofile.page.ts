import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { ToastController, MenuController } from '@ionic/angular';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { HelperService } from '../../services/helper/helper.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage implements OnInit {
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
  constructor(public helper:HelperService,private route:Router, private storage: Storage,
              private translate:TranslateService,public service:UserService, 
              private location: Location,private user:UserService,private menuCtrl:MenuController,
              public formBuilder: FormBuilder,public toastController:ToastController ) {
               
                this.menuCtrl.enable(true, 'custom');
                this.menuCtrl.enable(false, 'custom1');
                this.helper. getloginobservalble().subscribe(login=>{
                  this.loginedIn=login
                })
                 
               this.myForm = this.formBuilder.group({
                firstname: [ '',  Validators.required],
                lastname: [ '',  Validators.required],
                email: [ '', Validators.compose([Validators.email, Validators.required])],
                telephone: ['',  Validators.required]
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

  ngOnInit() {

  }

  ModifyWhishlist(){
    this.route.navigateByUrl('/tabs/favourite');
  }


  ChangePassword(){
    this.route.navigateByUrl('/changepassword');
  }

  ModifyAddresses(){
    this.route.navigateByUrl('/useraddresses');
  }

  MyOrders(){

  }

  YourTransations(){

  }

  subscribeNewsletter(){

  }

  logout(){
    this.storage.set('Smoky_loginedIn',false)
    this.helper.showSpinner()
    this.user.Logs_out_current_logged_in_user_session().then(
      (res:any)=>{
        if(res.success==1){
            this.helper.logout()
        }
        this.helper.hideSpinner()
      
      },(err:any)=>{
        this.helper.hideSpinner()
      }
    )
  }

  MyReturns(){
    this.route.navigateByUrl('/user-returns');
  }
  goBack(){
    this.location.back();
  }


  Editprofile(){
    //this.isEditing=true
   this.route.navigateByUrl('/userprofileedit') 
  }
}
