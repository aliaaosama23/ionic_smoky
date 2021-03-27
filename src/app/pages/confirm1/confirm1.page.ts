import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { HelperService } from '../../services/helper/helper.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { CheckoutService } from '../../services/checkout/checkout.service';
import { TranslateService } from '@ngx-translate/core';
import { MainserviceService } from 'src/app/services/mainservice/mainservice.service';
@Component({
  selector: 'app-confirm1',
  templateUrl: './confirm1.page.html',
  styleUrls: ['./confirm1.page.scss'],
})
export class Confirm1Page implements OnInit {
  fName:any
  lName:any
  region:any
  city:any
  country:any
  fristaddress:any
  secondaddress:any
  public myForm: FormGroup;
  countries:any[]
  cities:any[]
  countryId:any
  cityId:any
  pay_addresses:any[]
  newaddress:boolean=false
  address:any
  constructor(public helper:HelperService,private route:Router, 
              private storage: Storage,private translate:TranslateService,
              private checkout:CheckoutService,public service:MainserviceService,private location: Location,
              public formBuilder: FormBuilder,private user:UserService) {

                  this.helper.showSpinner()
                  this.checkout.Get_customers_payment_addresses().then(
                    (res:any)=>{
                      this.helper.hideSpinner()
                      if(res.success==1){
                        this.pay_addresses=res.data.addresses
                        this.pay_addresses.reverse();
                        this.address= this.pay_addresses[0].address_id
                      }
                    },(err:any)=>{
                      this.helper.hideSpinner()
                    }
                  )
  
                this.myForm = formBuilder.group({
                    firstname: ['', Validators.required],
                    lastname: ['',  Validators.required],
                    country_id:['',  Validators.required],
                    zone_id:['',  Validators.required],
                    city:['',  Validators.required],
                    address_1:['',  Validators.required],
                    address_2:['',  Validators.required],
                    postcode:['demo']
                  });                
                 
   }
    

  ngOnInit() {
     this.country=this.translate.instant("_country")
     this.fName=this.translate.instant("fName")
     this.lName=this.translate.instant("lName")
     this.region=this.translate.instant("region")
     this.city=this.translate.instant("city")
     this.fristaddress=this.translate.instant("fristaddress")
     this.secondaddress=this.translate.instant("secondaddress")
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

  setAddress(){
    console.log(this.address)
    if(this.address!=0){
      this.newaddress=false

      this.helper.showSpinner()
      this.service.Get_list_of_countries().subscribe(
        (res:any)=>{
          if(res.success==1){
            this.countries=res.data
          }
          this.helper.hideSpinner()
        },(err:any)=>{
          this.helper.hideSpinner()
        })

    }else{
      this.newaddress=true
      this.helper.showSpinner()
      this.service.Get_list_of_countries().subscribe(
        (res:any)=>{
          if(res.success==1){
            this.countries=res.data
          }
          this.helper.hideSpinner()
        },(err:any)=>{
          this.helper.hideSpinner()
        })
    }
  }

  SetPaymentAddress(){
    // payment address get   and set
    this.helper.showSpinner() 
    this.checkout.paymentaddress(this.myForm.value).then(
      (res:any)=>{
        if(res.success==1){
          this.route.navigateByUrl('/shipping-address')
          this.helper.hideSpinner()
        }
      },(err:any)=>{
        this.helper.hideSpinner()
      }
    )
  }

  setpaymentAddress_exist(){
    this.helper.showSpinner()
    this.checkout.Set_existing_payment_address_to_order(this.address).then(
      (res:any)=>{
        if(res.success==1){
          this.route.navigateByUrl('/shipping-address')
          this.helper.hideSpinner()
        }
      },(err:any)=>{
        this.helper.hideSpinner()
      }
    )
  }


}
