import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HelperService } from '../helper/helper.service';
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient,public helper:HelperService) { }

  //------------------- Guest checkout-create user Operations about guest user ---------------------------- //
  // Create guest user
 
  guest(object){
    const obj={
      "firstname": object.firstname,
      "lastname": object.lastname,
      "email": object.email,
      "telephone": object.telephone,
      "city": object.city,
      "country_id": object.country_id,
      "zone_id": object.zone_id,
      "fax": "000",
      "company": "000",
      "address_1": "000",
      "address_2":"000",
      "postcode": "000",
    }
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
    return this.http.post(this.helper.BaseUrl+'guest',obj, { headers: headers });
  }

  // Operations about guest shipping address

  guestshipping(){
  
    const obj={
      "firstname": "Demo",
      "lastname": "User",
      "city": "Berlin",
      "address_1": "Demo",
      "address_2": "Demo",
      "country_id": "81",
      "postcode": "3333",
      "zone_id": "1256"
    }
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
    return this.http.post(this.helper.BaseUrl+'guestshipping',obj, { headers: headers });
  }

  //-- Step 2 (only for registered users)	GET	api/rest/paymentaddress --//
  Get_customers_payment_addresses(){
    return new Promise((resolve, reject)=>{
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
    return this.http.get(this.helper.BaseUrl+'paymentaddress', { headers: headers })
    .subscribe(
    (data:any)=>{ 
      resolve(data) ;
    },
    (err:any)=>{ 
      reject(err);     
      for(let i=0;i<err.error.error.length;i++){
        this.helper.presentToastWithOptions(err.error.error[i])
      }
    })  
  })
  }

  //--  Step 3 (only for registered users)	POST	api/rest/paymentaddress  --//
  paymentaddress(object){
    return new Promise((resolve, reject)=>{
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
     this.http.post(this.helper.BaseUrl+'paymentaddress',object, { headers: headers })
     .subscribe(
      (data:any)=>{ 
        resolve(data) ;
      },
      (err:any)=>{ 
        reject(err);     
        for(let i=0;i<err.error.error.length;i++){
          this.helper.presentToastWithOptions(err.error.error[i])
        }
      })  
    })
  }
     
  Set_existing_payment_address_to_order(address_id){
    return new Promise((resolve, reject)=>{
    let object={ "address_id": address_id }
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
    return this.http.post(this.helper.BaseUrl+'paymentaddress/existing',object, { headers: headers })
    .subscribe(
      (data:any)=>{ 
        resolve(data) ;
      },
      (err:any)=>{ 
        reject(err);     
        for(let i=0;i<err.error.error.length;i++){
          this.helper.presentToastWithOptions(err.error.error[i])
        }
      })  
    })
  }

  //-- Step 4 (only for registered users)	GET	api/rest/shippingaddress  --//
  Get_customer_shipping_addresses(){
    return new Promise((resolve, reject)=>{
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
    return this.http.get(this.helper.BaseUrl+'shippingaddress', { headers: headers })
    .subscribe(
      (data:any)=>{ 
        resolve(data) ;
      },
      (err:any)=>{ 
        reject(err);     
        for(let i=0;i<err.error.error.length;i++){
          this.helper.presentToastWithOptions(err.error.error[i])
        }
      })
    })
  }

  //-- Step 5 (only for registered users)	POST	api/rest/shippingaddress --//
  Add_new_shipping_address_to_order(object){
    return new Promise((resolve, reject)=>{
      let headers = new HttpHeaders()
      .set('X-Oc-Merchant-Id', this.helper.SecretKey)
      .set('X-Oc-Session',this.helper.Session)
       this.http.post(this.helper.BaseUrl+'shippingaddress',object, { headers: headers })
       .subscribe(
        (data:any)=>{ 
          resolve(data) ;
        },
        (err:any)=>{ 
          reject(err);     
          for(let i=0;i<err.error.error.length;i++){
            this.helper.presentToastWithOptions(err.error.error[i])
          }
        })
      })
  }
  
  Set_existing_shipping_address_to_order(address_id){
    return new Promise((resolve, reject)=>{
    let object={ "address_id": address_id }
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
    return this.http.post(this.helper.BaseUrl+'shippingaddress/existing',object, { headers: headers })
    .subscribe(
      (data:any)=>{ 
        resolve(data) ;
      },
      (err:any)=>{ 
        reject(err);     
        for(let i=0;i<err.error.error.length;i++){
          this.helper.presentToastWithOptions(err.error.error[i])
        }
      })
    })
  }

  //-- Step 6	GET	api/rest/shippingmethods --//
  Get_shipping_methods(){
    return new Promise((resolve, reject)=>{
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
    return this.http.get(this.helper.BaseUrl+'shippingmethods', { headers: headers })
    .subscribe(
      (data:any)=>{ 
        resolve(data) ;
      },
      (err:any)=>{ 
        reject(err);     
        // for(let i=0;i<err.error.error.length;i++){
        //   this.helper.presentToastWithOptions(err.error.error[i])
        // }
        this.helper.set_err_msg(err.error.error[0])
      })
    })
  }
  //-- step 7 Post api/rest/shippingmethods  --//
  Set_shipping_method( object){
    return new Promise((resolve, reject)=>{
  
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
    return this.http.post(this.helper.BaseUrl+'shippingmethods',object, { headers: headers })
    .subscribe(
      (data:any)=>{ 
        resolve(data) ;
      },
      (err:any)=>{ 
        reject(err);     
        for(let i=0;i<err.error.error.length;i++){
          this.helper.presentToastWithOptions(err.error.error[i])
        }
        this.helper.set_err_msg(err.error.error[0])
      })
    })
  
  }

  //-- step 8 Get paymentmethods  --//
  get_paymentmethods(){
    return new Promise((resolve, reject)=>{
      let headers = new HttpHeaders()
      .set('X-Oc-Merchant-Id', this.helper.SecretKey)
      .set('X-Oc-Session',this.helper.Session)
      return this.http.get(this.helper.BaseUrl+'paymentmethods', { headers: headers })
      .subscribe(
        (data:any)=>{ 
          resolve(data) ;
        },
        (err:any)=>{ 
          reject(err);     
          for(let i=0;i<err.error.error.length;i++){
            this.helper.presentToastWithOptions(err.error.error[i])
          }
          this.helper.set_err_msg(err.error.error[0])
        })
      })
  }

  //-- step 9 Get paymentmethods  --//
  Set_payment_method(obj){
   
    return new Promise((resolve, reject)=>{
  
      let headers = new HttpHeaders()
      .set('X-Oc-Merchant-Id', this.helper.SecretKey)
      .set('X-Oc-Session',this.helper.Session)
      return this.http.post(this.helper.BaseUrl+'paymentmethods',obj, { headers: headers })
      .subscribe(
        (data:any)=>{ 
          resolve(data) ;
        },
        (err:any)=>{ 
          reject(err);     
          for(let i=0;i<err.error.error.length;i++){
            this.helper.presentToastWithOptions(err.error.error[i])
          }
          this.helper.set_err_msg(err.error.error[0])
        })
      })
  }

  //--  step 10 post api/rest/confirm --//
  confirm(){
      let headers = new HttpHeaders()
      .set('X-Oc-Merchant-Id', this.helper.SecretKey)
      .set('X-Oc-Session',this.helper.Session)
      return this.http.post(this.helper.BaseUrl+'confirm',{}, { headers: headers });    
  }

  //--  step 11 get     api/rest/pay--//
  
  //-- step 12  put  api/rest/confirm	 --//
  confirm_final(){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
    return this.http.put(this.helper.BaseUrl+'confirm',{}, { headers: headers });    
}
}
