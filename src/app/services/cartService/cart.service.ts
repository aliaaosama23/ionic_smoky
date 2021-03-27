import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HelperService } from '../helper/helper.service';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private count=new BehaviorSubject(0);
  constructor(private http: HttpClient, public helper:HelperService) { }

   // count cart items 


   increaseProduct(){
     // get the current value of count and increase it by one
      const newVal=this.count.getValue() +1 
      // update the value of count to new value 
      this.count.next(newVal) ;
   }

   decreaseProduct(){
      // get the current value of count and decrease it by one
      const newVal=this.count.getValue() -1
      // update the value of count to new value 
      this.count.next(newVal) ;
   }
   
   getCountObservable(): Observable<number>{
     return this.count.asObservable();
   }
    //----------------------------------- Cart Operations about Cart -------------------------------//
  
    GetCart(userSession){
      let headers = new HttpHeaders()
      .set('X-Oc-Merchant-Id', this.helper.SecretKey)
      .set('X-Oc-Session',userSession)
      .set('X-Oc-Currency', this.helper.currency)
      return this.http.get(this.helper.BaseUrl+'cart', { headers: headers });
    }
  
    Add_item_to_cart(product_id,quantity){
      const obj={
        "product_id":product_id,
        "quantity": quantity
      }
      let headers = new HttpHeaders()
      .set('X-Oc-Merchant-Id', this.helper.SecretKey)
      .set('X-Oc-Session',this.helper.Session)
      return this.http.post(this.helper.BaseUrl+'cart',obj, { headers: headers });
    
    }

    Remove_item_from_cart(key){ 
      const options = {
        headers: new HttpHeaders({
          'X-Oc-Merchant-Id': this.helper.SecretKey,
          'X-Oc-Session':this.helper.Session
        }),
        body: {
          key:key
        },
      };
      return this.http.delete(this.helper.BaseUrl+'cart',options)     
    }
  
    
     Update_cart_item_quantity(key,quantity){
      const Cart_quantity_object ={
        "key": key,
        "quantity": quantity
      }
      let headers = new HttpHeaders()
      .set('X-Oc-Merchant-Id', this.helper.SecretKey)
      .set('X-Oc-Session',this.helper.Session)
      return this.http.put(this.helper.BaseUrl+'cart',Cart_quantity_object , { headers: headers });
     }
  
}
