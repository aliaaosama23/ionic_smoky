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
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

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
  constructor(public user:UserService,public popoverController: PopoverController, public helper:HelperService,private storage: Storage,
              private route:Router, private location: Location,public service:MainserviceService,
              public formBuilder: FormBuilder,private translate:TranslateService) {
                    this.myForm = formBuilder.group({
                          f_name: ['', Validators.required],
                          l_name: ['', Validators.required],
                          email: ['', Validators.compose([Validators.email, Validators.required])],
                          city:['', Validators.required],
                          telephone: ['', Validators.required],
                          country:['', Validators.required],
                          zone_id:['', Validators.required],
                          password:['',Validators.compose([Validators.maxLength(20),Validators.minLength(3), Validators.required])],
                          confirm:['', Validators.compose([Validators.maxLength(20),Validators.minLength(3), Validators.required])],
                          agree:[false, Validators.required]
                      });

                    this.service.Get_list_of_countries().subscribe(
                      (res:any)=>{
                        if(res.success==1){
                          this.countries=res.data
                        }
                        
                      },(err:any)=>{}
                    )
   }


  ngOnInit() {
    this.fName=this.translate.instant("fName")
    this.lName=this.translate.instant("lName")
    this.email=this.translate.instant("email")
    this.city=this.translate.instant("city")
    this.mobile=this.translate.instant("mobile")
    this.country=this.translate.instant("country")
    this.region=this.translate.instant("region")
    this.password=this.translate.instant("password")
    this.confirmpassword=this.translate.instant("confirmpassword")
  }

   async presentPopover(ev: Event) {
    this.service.Get_list_of_information().subscribe(
      async (res:any)=>{     
          const popover = await this.popoverController.create({
            component: PopoverpagePage,
            showBackdrop:false,
            event:ev,
            componentProps:{
              'info_id':res.data[1].id
            }
          })
          popover.present()
                        
      },(err:any)=>{

      })


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

  signup(){
    if(this.myForm.valid){
       this.user.Create_customer(this.myForm.value).then(
         (res:any)=>{
            if(res.success==1){
              this.helper.presentToastWithOptions('تم التسجيل ينجاح')
              this.route.navigateByUrl('/main');
              this.storage.set('Smoky_loginedIn',true)
            }
         },(err:any)=>{
         }
       )
    }else{
      this.helper.presentToastWithOptions('تأكد من ادخال كل البيانات')
    }
  }

}
