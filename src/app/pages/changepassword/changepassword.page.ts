import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'src/app/services/helper/helper.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {

  _password:any
  _confirm:any

  public myForm: FormGroup;
  
  constructor(public helper:HelperService,private translate:TranslateService,
              public service:UserService,public alertController: AlertController,
              private location: Location,private user:UserService,
              public formBuilder: FormBuilder ) {}


  ngOnInit() {
    this.myForm = this.formBuilder.group({
      password: [ '',  Validators.required],
      confirm: [ '',  Validators.required],
    });
  }

  goBack(){
    this.location.back()
  }


  ChangePassword(){
    this.helper.showSpinner()
    this.user.Change_customer_password(this.myForm.value).subscribe(
      async (res:any)=>{
        if(res.success==1){
          this.helper.hideSpinner()
          
            const alert = await this.alertController.create({
              cssClass: 'my-custom-class',
              message: this.translate.instant('password changed successfully'),
              buttons: [
                { 'text': this.translate.instant('okay'),
                handler: () => {
                  this.location.back()
                }
              
                }]
            });
        
            await alert.present();

          }
        

      },(err:any)=>{
        this.helper.hideSpinner()
      }
    )
  }
}
