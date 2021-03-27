import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { HelperService } from '../../services/helper/helper.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.page.html',
  styleUrls: ['./forgetpassword.page.scss'],
})
export class ForgetpasswordPage implements OnInit {

  public myForm: FormGroup;
  email:any
  constructor(public helper:HelperService,private route:Router, private storage: Storage,private translate:TranslateService,
              public service:UserService, private location: Location,public formBuilder: FormBuilder) {
                  this.myForm = formBuilder.group({
                    email: ['', Validators.compose([Validators.email, Validators.required])],
                  });
   }

  ngOnInit() {
    this.email=this.translate.instant("email")
  }


  goBack(){
    this.location.back();
  }

  forgetpassword(){
    this.service.forgotten(this.myForm.value.email).then(
      (res:any)=>{
        if(res.success==1){
          this.helper.presentToastWithOptions(this.translate.instant("email sent with new password"))
          this.route.navigateByUrl('/login')
        }
      },(err:any)=>{

      }
    )
  }

}
