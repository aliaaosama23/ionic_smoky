import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HelperService } from '../helper/helper.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient,public helper:HelperService) { }
 
  GetSession(){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)

    return this.http.get(this.helper.BaseUrl+'session', { headers: headers });
  }
  //account Get account details
  profile(){
    return new Promise((resolve, reject)=>{
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
     this.http.get(this.helper.BaseUrl+'account', { headers: headers })
    .subscribe(
      (data:any)=>{ 
        resolve(data) ;
      },
      (err:any)=>{ 
        reject(err);     
        // for(let i=0;i<err.error.error.length;i++){
        //   this.helper.presentToastWithOptions(err.error.error[i])
        // }
      }
     ) 
    }) 
  }

  // account Update account data
  profile_Update(object){
    let Update_account_object={
      "firstname":object.firstname,
      "lastname": object.lastname,
      "email": object.email,
      "telephone": object.telephone,
      "fax":object.fax
    }

    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
    return this.http.put(this.helper.BaseUrl+'account',Update_account_object, { headers: headers });
  }

  // Change customer's password
  Change_customer_password(object){

    let Update_account_password={
      "password": object.password,
      "confirm": object.confirm
    }

    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
    return this.http.put(this.helper.BaseUrl+'/account/password',Update_account_password, { headers: headers });
  }

  // forgotten Forgotten password
  forgotten(email){
    return new Promise((resolve, reject)=>{
    let Forgotten_object={
      'email':email
    }
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
     this.http.post(this.helper.BaseUrl+'forgotten',Forgotten_object, { headers: headers })
     .subscribe(
      (data:any)=>{ 
        resolve(data) ;
      },
      (err:any)=>{ 
        reject(err);      //     this.presentToastconnection()
        for(let i=0;i<err.error.error.length;i++){
          this.helper.presentToastWithOptions(err.error.error[i])
        }
      }
     )  
  })

  }

  // login Logs user into the system
  login(object){
    return new Promise((resolve, reject)=>{
    let Login_object={
      "email": object.email,
      "password": object.password
    }
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
     this.http.post(this.helper.BaseUrl+'login',Login_object, { headers: headers })
    //  .pipe(
    //   catchError(this.helper.handleError)
    // )
     .subscribe(
      (data:any)=>{ 
        resolve(data) ;
      },
      (err:any)=>{ 
        reject(err);      //     this.presentToastconnection()
        for(let i=0;i<err.error.error.length;i++){
          this.helper.presentToastWithOptions(err.error.error[i])
        }
      }
     )  
  })
  }

  // logout Logs out current logged in user session
  Logs_out_current_logged_in_user_session(){
    return new Promise((resolve, reject)=>{
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
     this.http.post(this.helper.BaseUrl+'logout',{}, { headers: headers })
    .subscribe(
      (data:any)=>{ 
        resolve(data) ;
      },
      (err:any)=>{ 
        reject(err);      //     this.presentToastconnection()
        for(let i=0;i<err.error.error.length;i++){
          this.helper.presentToastWithOptions(err.error.error[i])
        }
        if(err.error.error[0]=="User is not logged."){
          this.helper.logout();
        }
      }
     )  
  })
  }
  
  // register Create customer
  Create_customer(object){
    return new Promise((resolve, reject)=>{
    let body={
      "firstname": object.f_name,
      "lastname": object.l_name,
      "email": object.email,
      "password": object.password,
      "confirm": object.confirm,
      "telephone": object.telephone,
      "country_id": object.country,
      "zone_id": object.city,
      "agree":  object.agree,
      "fax": "1-541-754-3010",
      "company_id": "string",
      "company": "string",
      "city": "Berlin",
      "address_1": "Demo",
      "address_2": "Demo",
      "postcode": "3333",
      "tax_id": "1",
      "customer_group_id": "1",
      "custom_field": {
        "account": {
          "1": "+364545454"
        },
        "address": {
          "4": "+364545454"
        }
      }
    }
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
     this.http.post(this.helper.BaseUrl+'register',body, { headers: headers })
     .subscribe(
      (data:any)=>{ 
        resolve(data) ;
      },
      (err:any)=>{ 
        reject(err);      //     this.presentToastconnection()
        for(let i=0;i<err.error.error.length;i++){
          this.helper.presentToastWithOptions(err.error.error[i])
        }
      }
     )  
    })
  }

  // sociallogin Social login
  Social_login(email,access_token,provider){
    return new Promise((resolve, reject)=>{
    let Login_object={
      "email": email,
      "access_token": access_token,
      "provider": provider
    }
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
     this.http.post(this.helper.BaseUrl+'sociallogin',Login_object, { headers: headers })
    .subscribe(
      (data:any)=>{ 
        resolve(data) ;
      },
      (err:any)=>{ 
        reject(err);      //     this.presentToastconnection()
        for(let i=0;i<err.error.error.length;i++){
          this.helper.presentToastWithOptions(err.error.error[i])
        }
      }
     )  
    })
  }

  returns(){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
     return this.http.get("https://smo-ky.com/api/rest/returns", { headers: headers })  
  }

  transactions(){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
     return this.http.get("https://smo-ky.com/api/rest/account/transactions", { headers: headers })  
  }

  account_addresses(){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
     return this.http.get("https://smo-ky.com/api/rest/account/address", { headers: headers })  
  }

  delete_address(id){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
     return this.http.delete(this.helper.BaseUrl+"account/address/"+id, { headers: headers }) 
  }

  edit_address(id,object){
    let AddressObject={
      "firstname": object.firstname,
      "lastname": object.lastname,
      "city": object.city,
      "address_1": object.address_1,
      "address_2": object.address_2,
      "country_id": object.country_id,
      "postcode":  object.postcode,
      "zone_id":object.zone_id,
      "company": object.company,
      "default": object.default
    }
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
     return this.http.put(this.helper.BaseUrl+"account/address/"+id,AddressObject, { headers: headers }) 
  }

  add_address(object){
    let AddressObject={
      "firstname": object.firstname,
      "lastname": object.lastname,
      "city": object.city,
      "address_1": object.address_1,
      "address_2": object.address_2,
      "country_id": object.country_id,
      "postcode":  object.postcode,
      "zone_id":object.zone_id,
      "company": object.company,
      "default": object.default
    }
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
     
     return this.http.post(this.helper.BaseUrl+"account/address",AddressObject, { headers: headers }) 
  }

  get_address_by_id(address_id){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
     return this.http.get(this.helper.BaseUrl+"account/address/"+address_id, { headers: headers }) 
  }

  // ------------ customer newsletter  ----------------- //
  subscribe_newsletter(){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
     return this.http.put(this.helper.BaseUrl+"newsletter/subscribe", { headers: headers }) 
  }

  unsubscribe_newsletter(){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
     return this.http.put(this.helper.BaseUrl+"newsletter/unsubscribe", { headers: headers }) 
  }

  // ----------- customerorders   ----------------------//
  customerordersByID(id){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
     return this.http.get(this.helper.BaseUrl+"customerorders/"+id, { headers: headers }) 
  }

  customerorders(page){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
     return this.http.get(this.helper.BaseUrl+"customerorders/limit/10/page/"+page, { headers: headers }) 
  }
}
