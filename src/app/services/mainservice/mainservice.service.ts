import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HelperService } from '../helper/helper.service';
import { decode } from 'punycode';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class MainserviceService {

  constructor(private http: HttpClient,public helper:HelperService) { }

  //---------- Languages -----------

  Getlanguages(){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Merchant-Language',this.helper.selected)
    return this.http.get(this.helper.BaseUrl+'languages', { headers: headers });
  }

  Get_list_of_information(){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Merchant-Language',this.helper.selected)
    return this.http.get(this.helper.BaseUrl+'information', { headers: headers });
  }
  
  // Information Operations about store info
  Get_information_details_by_ID(id){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Merchant-Language',this.helper.selected)
    return this.http.get(this.helper.BaseUrl+'information/'+id, { headers: headers });
  }
//---------- session -----------


  Get_list_of_countries(){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    return this.http.get(this.helper.BaseUrl+'countries', { headers: headers });
  }

  Get_zones_by_ID(id){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    return this.http.get(this.helper.BaseUrl+'countries/'+id, { headers: headers });
  }
  // home page services
  GetSlideshows(){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Merchant-Language',this.helper.selected)
    return this.http.get(this.helper.BaseUrl+'slideshows', { headers: headers });
  }

  GetBanners(){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Merchant-Language',this.helper.selected)
    return this.http.get(this.helper.BaseUrl+'banners', { headers: headers })  
  }
  
  GetBannerById(id){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Merchant-Language',this.helper.selected)
    return this.http.get(this.helper.BaseUrl+'banners/'+id, { headers: headers })  
  }

  GetSpecials(){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Currency', this.helper.currency)
    .set('X-Oc-Merchant-Language',this.helper.selected)
    return this.http.get(this.helper.BaseUrl+'specials', { headers: headers });
  }
  
  ProductsBestsellers(){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Currency', this.helper.currency)
    .set('X-Oc-Merchant-Language',this.helper.selected)
    return this.http.get(this.helper.BaseUrl+'bestsellers', { headers: headers });
  }

  GetCategories(){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Merchant-Language',this.helper.selected)
    return this.http.get(this.helper.BaseUrl+'categories', { headers: headers })
  }

  GetCategoriesLevel(parent_id,level){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Merchant-Language',this.helper.selected)
    return this.http.get(this.helper.BaseUrl+'categories/parent/'+parent_id+'/level/'+level, { headers: headers })
  }

  LatestProducts(){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Currency', this.helper.currency)
    .set('X-Oc-Merchant-Language',this.helper.selected)
    return this.http.get(this.helper.BaseUrl+'latest', { headers: headers });
  }


  ListOfLatestProducts(limit){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Currency', this.helper.currency)
    .set('X-Oc-Merchant-Language',this.helper.selected)
    return this.http.get(this.helper.BaseUrl+'latest'+limit, { headers: headers });
  }

  manufacturers(){ // الماركات - بدون اي صور 
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Currency', this.helper.currency)
    .set('X-Oc-Merchant-Language',this.helper.selected)
    return this.http.get(this.helper.BaseUrl+'manufacturers', { headers: headers });
  }

  GetOffers(page){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Currency', this.helper.currency)
    .set('X-Oc-Merchant-Language',this.helper.selected)

    // products/category/{category_id}/limit/{limit}/page/{page}
    return this.http.get(this.helper.BaseUrl+'products/category/270/limit/10'+'/page/'+page, { headers: headers });
  }

  //-------------------------------------------- product -------------------------------------//
  Get_product_details_by_ID(id){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Currency', this.helper.currency)
    .set('X-Oc-Merchant-Language',this.helper.selected)
    return this.http.get(this.helper.BaseUrl+'products/'+id, { headers: headers });
  }

  ProductsRelated(productID){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Currency', this.helper.currency)
    .set('X-Oc-Merchant-Language',this.helper.selected)
    return this.http.get('https://smo-ky.com/index.php?route=feed/rest_api/related&id='+productID, { headers: headers });
  }

  Get_list_of_products_by_category_ID(category_id,limit,page,sort,order){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Currency', this.helper.currency)
    .set('X-Oc-Merchant-Language',this.helper.selected)
   // return this.http.get(this.helper.BaseUrl+'products/category/'+category_id+'/limit/'+limit+'/page/'+page, { headers: headers });
   return this.http.get("https://smo-ky.com/index.php?route=feed/rest_api/products&sort="+sort+"&order="+order+"&category="+category_id+"&limit="+limit+"&page="+page, { headers: headers });
  }

  Get_list_of_products_by_category_ID_all(category_id){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Currency', this.helper.currency)
    .set('X-Oc-Merchant-Language',this.helper.selected)
    return this.http.get(this.helper.BaseUrl+'products/category/'+category_id, { headers: headers });
  }

  custom_search(limit,page,Product_search_object){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
    .set('X-Oc-Currency', this.helper.currency)
    .set('X-Oc-Merchant-Language',this.helper.selected)
    return this.http.post(this.helper.BaseUrl+'products/custom_search/limit/'+limit+'/page/'+page,Product_search_object, { headers: headers });
  }
  _custom_search(limit,page,cat,sort,order){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
    .set('X-Oc-Currency', this.helper.currency)
    .set('X-Oc-Merchant-Language',this.helper.selected)
    return this.http.get('https://smo-ky.com/index.php?route=feed/rest_api/search&limit='+limit+'&page='+page+'&category='+cat+'&sort='+sort+'&order='+order,{ headers: headers });
  }

  
  _acustom_search(limit,page,cat,sort,order){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
    .set('X-Oc-Currency', this.helper.currency)
    .set('X-Oc-Merchant-Language',this.helper.selected)
    return this.http.get("https://smo-ky.com/index.php?route=feed/rest_api/products&sort="+sort+"&order="+order+"&category="+cat+"&limit="+limit+"&page="+page,{ headers: headers });
  }


  CompareProducts(ids){
     let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
    return this.http.get('https://smo-ky.com/index.php?route=feed/rest_api/compare&ids'+ids,{ headers: headers });
  }

  ProductsReview(product_id,Review_object){
    return new Promise((resolve, reject)=>{
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
    this.http.post('https://smo-ky.com/index.php?route=feed/rest_api/reviews&id='+product_id,Review_object,{ headers: headers }).subscribe(
      (data:any)=>{ 
        resolve(data) ;
      },
      (err:any)=>{ 
        reject(err);     
        for(let i=0;i<err.error.error.length;i++){
          this.helper.presentToastWithOptions(err.error.error[i])
        }
      }
     ) 
  })
}

  // 

  //---------------------------------  Wishlist Operations about wishlist  --------------------------------//
  Add_product_to_wishlist(product_id){ 
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
    .set('X-Oc-Merchant-Language',this.helper.selected)
    return this.http.post(this.helper.BaseUrl+'wishlist/'+product_id,{}, { headers: headers });
  
  }

  Get_wishlist(){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
    .set('X-Oc-Currency', this.helper.currency)
    .set('X-Oc-Merchant-Language',this.helper.selected)
    return this.http.get(this.helper.BaseUrl+'wishlist', { headers: headers });
  }
  
  Remove_product_from_wishlist(product_id){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
    
    return this.http.delete(this.helper.BaseUrl+'wishlist/'+product_id, { headers: headers });
  }


  //------------------------------ Search products ---------------------------------//
  Search(text,limit,page,sort,order){ 
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
    .set('X-Oc-Currency', this.helper.currency)
    .set('X-Oc-Merchant-Language',this.helper.selected)
    return this.http.get('https://smo-ky.com/index.php?route=feed/rest_api/products&search='+text+'&limit='+limit+'&page='+page+'&sort='+sort+'&order='+order, { headers: headers })
  }

  Searchwithallpages(text,sort,order){ 
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
    .set('X-Oc-Currency', this.helper.currency)
    .set('X-Oc-Merchant-Language',this.helper.selected)
    return this.http.get('https://smo-ky.com/index.php?route=feed/rest_api/products&search='+text+'&limit='+'&sort='+sort+'&order='+order, { headers: headers })
  }

  Search_custom(text,limit,page,sort,order){ // custom search
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
    .set('X-Oc-Currency', this.helper.currency)
    .set('X-Oc-Merchant-Language',this.helper.selected)
    return this.http.get('https://smo-ky.com/index.php?route=feed/rest_api/products&search='+text+'&limit='+limit+'&page='+page+'&sort='+sort+'&order='+order, { headers: headers })

  }

  // Send contact message

  contact(object){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Session',this.helper.Session)
    
    return this.http.post(this.helper.BaseUrl+'contact',object, { headers: headers });
  }

  //product_classes
  product_classes(){
    let headers = new HttpHeaders()
    .set('X-Oc-Merchant-Id', this.helper.SecretKey)
    .set('X-Oc-Merchant-Language',this.helper.selected)
    return this.http.get(this.helper.BaseUrl+'product_classes', { headers: headers });
  }
}
