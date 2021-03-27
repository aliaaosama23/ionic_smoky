import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from '../../services/helper/helper.service';
import { UserService } from '../../services/user/user.service';
import { Location } from "@angular/common";
import { Storage } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { TranslateService } from '@ngx-translate/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Platform, AlertController } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:any
  password:any
  public myForm: FormGroup;
  private logined=new BehaviorSubject(false);
  dir:boolean
  loginWithFingerprint:boolean
  emailValue:any
  passwordValue:any
  constructor(public helper:HelperService,private route:Router,private translate:TranslateService,
              private storage: Storage,private googlePlus: GooglePlus,private fb: Facebook,
              public service:UserService, private location: Location,private plt:Platform,
              public formBuilder: FormBuilder,private faio: FingerprintAIO,private alertController:AlertController,
              ) {
                this.myForm = formBuilder.group({
                  email: ['', Validators.compose([Validators.email, Validators.required])],
                  password: ['',  Validators.required],
                });     

                console.log(this.plt.isRTL)
                this.dir=this.plt.isRTL

                this.storage.get('Smoky_fingerprintLogin').then((val)=>{
                  if(val){
                    this.loginWithFingerprint=true          
                  }else{
                    this.loginWithFingerprint=false
                  }
                })

   }

  ngOnInit() {
    this.email=this.translate.instant("email")
    this.password=this.translate.instant("password")
  }
  
  goBack(){
    this.location.back();
  }

 
   login(){
   this.service.login(this.myForm.value).then(
     async (res:any)=>{
       if(res.success== 1){
        this.storage.set('Smoky_loginedIn',true)

        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          message: this.translate.instant("login with fingerprint"),
          buttons: [
            {
              text: this.translate.instant("cancel"),
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                this.route.navigateByUrl('/')
                this.helper.login()
                this.logined.next(true)
              }
            }, {
              text: this.translate.instant("ok"),
              handler: () => {
                this.storage.set('Smoky_fingerprintLogin',true)
                this.faio.isAvailable().then(
                  (res)=>{
                    console.log( "fingerprint is available :  "+ res)
                        this.faio.show({
                          'title':"سموكي",
                          'fallbackButtonTitle':"Use Pin",
                          'cancelButtonTitle':"Cancel",
                          'disableBackup':false   
                      })
                      .then((result: any) => {
                          this.route.navigateByUrl('/')
                          this.helper.login()
                          this.logined.next(true)
                      })  
                      .catch((error: any) => {
                        console.log( "fio error :  "+JSON.stringify( error))
                      });
                  },(err)=>{
                    console.log("fingerprint is not  available :  "+ JSON.stringify(err))
                  }
                ) 
              }
            }
          ]
        });
        await alert.present();
       }
     },(err:any)=>{
     
     })
  }

  loginFinger(){
    this.faio.isAvailable().then(
      (res)=>{
        console.log( "fingerprint is available :  "+ res)
            this.faio.show({
              'title':"سموكي",
              'fallbackButtonTitle':"Use Pin",
              'cancelButtonTitle':"Cancel",
              'disableBackup':false   
          })
          .then((result: any) => {
            console.log( "fio result :  "+ JSON.stringify(result))

              this.storage.get('Smoky_email').then((email)=>{
                this.emailValue=email
              })

              this.storage.get('Smoky_password').then((password)=>{
                this.passwordValue=password
              })


              this.storage.set('Smoky_fingerprintLogin',true)
              this.route.navigateByUrl('/')
              this.helper.login()
              this.logined.next(true)
          })  
          .catch((error: any) => {
            console.log( "fio error :  "+JSON.stringify( error))
          });
      },(err)=>{
        console.log("fingerprint is not  available :  "+ JSON.stringify(err))
      }
    ) 
  }

  loginGoogle(){
    this.googlePlus.login({})
    .then((res:any) => {
             console.log( "login res   :  "+ JSON.stringify(res))
            this.service.Social_login(res.email,res.accessToken,'google')
            .then(
              (result:any)=>{
                if(result.success==1){
                  this.storage.set('Smoky_loginedIn',true)
                  this.helper.login()
                  this.logined.next(true)
                  this.route.navigateByUrl('/')
                }   
              }
            )
    })
    .catch(err => console.error(err));
  }

  loginFacebook(){   
    this.fb.login(['public_profile',  'email'])
    .then((res: FacebookLoginResponse) => { 
      console.log('Logged into Facebook!',JSON.stringify( res)) 
        if(res.status=="connected"){  
          this.fb.api("/"+  res.authResponse.userID+ "/?fields=id,email,name",['public_profile']).then((userData:any)=>{
            this.service.Social_login(userData.email,res.authResponse.accessToken,"facebook")
            .then(
              (result:any)=>{
                if(result.success==1){
                  this.storage.set('Smoky_loginedIn',true)
                  this.storage.set('Smoky_facebookLogin',true)
                  this.helper.login()
                  this.logined.next(true)
                  this.route.navigateByUrl('/')
                }   
              }
            )
          }) 
        }
    })
    .catch(e => console.log('Error logging into Facebook', e));
  }

  forgetpassword(){
    this.route.navigateByUrl('/forgetpassword')
  }
  

}
