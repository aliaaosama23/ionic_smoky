import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper/helper.service';
import { CheckoutService } from '../../services/checkout/checkout.service';
import { Location } from "@angular/common";
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MainserviceService } from 'src/app/services/mainservice/mainservice.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.page.html',
  styleUrls: ['./shipping-address.page.scss'],
})
export class ShippingAddressPage implements OnInit {
  shipping_addresses:any[]
  shipping_methods:any[]
  newaddress:boolean=false
  address:any
  shipping_metod:any
  public myForm: FormGroup;
  countries:any[]
  cities:any[]
  countryId:any
  cityId:any
  shipping_methods_error_Msg:string
  methods:boolean
  fName:any
  lName:any
  country:any
  region:any
  city:any
  fristAddress:any
  secondAddress:any
  constructor(public helper:HelperService,private route:Router,private translate:TranslateService, 
              private checkout:CheckoutService,public service:UserService,private location: Location,
              public formBuilder: FormBuilder,private user:UserService,private _service:MainserviceService) {

                this.helper.showSpinner()
                this.checkout.Get_customer_shipping_addresses().then(
                  (res:any)=>{
                    this.helper.hideSpinner()
                    if(res.success==1){
                      this.shipping_addresses=res.data.addresses
                      this.shipping_addresses.reverse();
                      this.address= this.shipping_addresses[0].address_id
                    }
                  },(err:any)=>{
                    this.helper.hideSpinner()
                  }
                )

                this.helper.showSpinner()
            

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
    this.fName=this.translate.instant("fName")
    this.lName=this.translate.instant("lName")
    this.country=this.translate.instant("country")
    this.region=this.translate.instant("region")
    this.city=this.translate.instant("city")
    this.fristAddress=this.translate.instant("fristaddress")
    this.secondAddress=this.translate.instant("secondaddress")
  }

  selectCountry(){
    this._service.Get_zones_by_ID(this.countryId).subscribe(
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
    this._service.Get_list_of_countries().subscribe(
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
    }
  }



  SetPaymentAddress(){
      // payment address get   and set
      this.helper.showSpinner() 
      this.checkout.Add_new_shipping_address_to_order(this.myForm.value).then(
      (res:any)=>{
        if(res.success==1){
        this.route.navigateByUrl('/shipping-method')
        this.helper.hideSpinner()
      }
      },(err:any)=>{
      this.helper.hideSpinner()
      })
  }

  setpaymentAddress_exist(){
      this.helper.showSpinner()
      this.checkout.Set_existing_shipping_address_to_order(this.address).then(
      (res:any)=>{
        if(res.success==1){
          this.route.navigateByUrl('/shipping-method')
        this.helper.hideSpinner()
        }
      },(err:any)=>{
      this.helper.hideSpinner()
      }
      )
  }

  goBack(){
    this.location.back();
  }


}
