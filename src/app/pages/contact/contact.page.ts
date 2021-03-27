import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { HelperService } from '../../services/helper/helper.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { MainserviceService } from '../../services/mainservice/mainservice.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  public myForm: FormGroup;
  name:any
  email:any
  message:any
  constructor(public helper:HelperService,private route:Router, private storage: Storage,private translate:TranslateService,
              public service:MainserviceService, private location: Location,public formBuilder: FormBuilder) {
                  this.myForm = formBuilder.group({
                    name:['', Validators.required],
                    email: ['', Validators.compose([Validators.email, Validators.required])],
                    enquiry: ['',  Validators.required]
                  });
   }

  ngOnInit() {
    this.name=this.translate.instant("name")
    this.email=this.translate.instant("email")
    this.message=this.translate.instant("message")
  }

  goBack(){
    this.location.back();
  }

  contact(){
    this.helper.showSpinner()
   this.service.contact(this.myForm.value).subscribe(
     (res:any)=>{
       if(res.success== 1){
        this.helper.presentToastWithOptions(this.translate.instant("message sent successfully"))
        this.myForm.reset()
        this.helper.hideSpinner()
       }
     },(err:any)=>{
      this.helper.hideSpinner()
     })
  }

}
