import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { ToastController, MenuController } from '@ionic/angular';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { HelperService } from '../../services/helper/helper.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from 'src/app/services/cartService/cart.service';
import { MainserviceService } from 'src/app/services/mainservice/mainservice.service';

@Component({
  selector: 'app-usseraddresses-add-edit',
  templateUrl: './usseraddresses-add-edit.page.html',
  styleUrls: ['./usseraddresses-add-edit.page.scss'],
})
export class UsseraddressesAddEditPage implements OnInit {
  addressId:any
  IsEditing:boolean
  cartNumber:number
  public myForm: FormGroup;
  countries:any[]=[]
  countryId:any
  cities:any[]=[]
  // fName: any;
  // lName: any;
  // _city: any;
  // country: any;
  // _postcode:any
  // _address_1:any
  // _address_2:any
  // _company:any
  // region:any
      _firstname:any;
      _lastname:any;
      _company:any;
      _address_1: any;
      _address_2:any;
      _city: any;
      _postcode:any;
      _country_id:any;  
      _zone_id:any;    
      _default:any;
      AddressData:any={}
  constructor(public helper:HelperService,private route:Router, private cartService:CartService,
    private translate:TranslateService,public service:MainserviceService, private activatedRoute:ActivatedRoute,
    private location: Location,private user:UserService,
    public formBuilder: FormBuilder,public toastController:ToastController ) {}
     

  ngOnInit() {

    this.cartService.getCountObservable().subscribe(cartItemsNumber=>{
      this.cartNumber=cartItemsNumber
    })
    this.addressId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.addressId)
    if(this.addressId==0){
      this.IsEditing=false
    }else{
      this.IsEditing=true
      this.helper.showSpinner()
      this.user.get_address_by_id(this.addressId).subscribe(
        (res:any)=>{
          if(res.success==1){
           this.AddressData= res.data
           this._address_1=this.AddressData.address_1
           this._address_2=this.AddressData.address_2
           this._company=this.AddressData.company
           this.countryId=this.AddressData.country_id
           this._firstname=this.AddressData.firstname
           this._lastname=this.AddressData.lastname
           this._postcode=this.AddressData.postcode
           this._city=this.AddressData.city
          }

        },(err:any)=>{

        }
      )
    }


    this.myForm = this.formBuilder.group({
      firstname: [ '',  Validators.required],
      lastname: [ '',  Validators.required],
      company:['',  Validators.required],
      address_1: ['',  Validators.required],
      address_2:['',  Validators.required],
      city: [ '',Validators.required],
      postcode:['',  Validators.required],
      country_id:['',  Validators.required],    
      zone_id:['',  Validators.required],     
      default:['',  Validators.required]
    });  

    this.service.Get_list_of_countries().subscribe(
      (res:any)=>{
        if(res.success==1){
          this.countries=res.data
        } 
      },(err:any)=>{}
    )
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

  cart(){
    this.route.navigateByUrl('tabs/cart');
  }

  goBack(){
    this.location.back()
  }

  AddAddress(){
    this.helper.showSpinner()
    this.user.add_address(this.myForm.value).subscribe(
      (res:any)=>{
        if(res.success==1){
             this.helper.hideSpinner()
             this.location.back()
        }
      },(err:any)=>{
        this.helper.hideSpinner()
      }
      
    )
  }

  EditAddress(){
    this.helper.showSpinner()
    this.user.edit_address(this.addressId,this.myForm.value).subscribe(
      (res:any)=>{
        if(res.success==1){
             this.helper.hideSpinner()
             this.location.back()
        }
      },(err:any)=>{
        this.helper.hideSpinner()
      }
      
    )
  }

}
