import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { HelperService } from '../../services/helper/helper.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { MainserviceService } from '../../services/mainservice/mainservice.service';
import { PopoverController } from '@ionic/angular';
import { PopoverpagePage } from '../popoverpage/popoverpage.page';
import { TranslateService } from '@ngx-translate/core';
import { CheckoutService } from '../../services/checkout/checkout.service';
@Component({
  selector: 'app-guest',
  templateUrl: './guest.page.html',
  styleUrls: ['./guest.page.scss'],
})
export class GuestPage implements OnInit {

  public myForm: FormGroup;
  countries:any[]
  cities:any[]
  countryId:any
  fName:any
  lName:any
  email:any
  city:any
  mobile:any
  country:any
  region:any
  password:any
  confirmpassword:any
  constructor(public user:UserService,public popoverController: PopoverController, 
              public helper:HelperService,private storage: Storage,private checkout:CheckoutService,
              private route:Router, private location: Location,public service:MainserviceService,
              public formBuilder: FormBuilder,private translate:TranslateService) {
                    this.myForm = formBuilder.group({
                      firstname: ['', Validators.required],
                      lastname: ['', Validators.required],
                          email: ['', Validators.compose([Validators.email, Validators.required])],
                          telephone: ['', Validators.required],
                          country_id:['', Validators.required],
                          zone_id:['', Validators.required],
                          city:['', Validators.required],
                        
                      });

                      this.fName=this.translate.instant("fName")
                      this.lName=this.translate.instant("lName")
                      this.email=this.translate.instant("email")
                      this.city=this.translate.instant("city")
                      this.mobile=this.translate.instant("mobile")
                      this.country=this.translate.instant("country")
                      this.region=this.translate.instant("region")
                    this.service.Get_list_of_countries().subscribe(
                      (res:any)=>{
                        if(res.success==1){
                          this.countries=res.data
                        }
                        
                      },(err:any)=>{}
                    )

   }


  ngOnInit() {
   
  }

  selectCountry(){
    this.service.Get_zones_by_ID(this.countryId).subscribe(
      (res:any)=>{
        if(res.success==1){
          this.cities=res.data.zone
        }
        
      },(err:any)=>{}
    )
  }

  goBack(){
    this.location.back();
  }

  register(){
    console.log(JSON.stringify(this.myForm.value))
    this.checkout.guest(this.myForm.value).subscribe(
      (res:any)=>{
        if(res.success==1){
          this.route.navigateByUrl('guest-continue')
        }
      }
    )
  }
}
