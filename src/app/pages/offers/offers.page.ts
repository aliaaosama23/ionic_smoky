import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { MainserviceService } from '../../services/mainservice/mainservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../../services/helper/helper.service';
import { CartService } from '../../services/cartService/cart.service';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '../../services/dataService/data.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  cartNumber:number
  categories:any[]=[]
  catname:string=''
  categoryID:any
  noProducts:boolean
  isGrid:boolean=true
  page:number=1
  maximumLength:number=0
  nodata:boolean
  offers:any[]=[]
  constructor(private router:Router,private location: Location,private activatedRoute: ActivatedRoute,
              private translate: TranslateService,private service:MainserviceService,
              private dataService: DataService,private helper:HelperService,private cartservice:CartService) {

                this.cartservice.getCountObservable().subscribe(cartItemsNumber=>{
                  this.cartNumber=cartItemsNumber
                })
                this.service.GetOffers(this.page).subscribe(
                  (res:any)=>{
                     if(res.data.length!=0){
                      this.maximumLength=res.data.length/10
                      console.log(this.maximumLength)
                      this.nodata=false
                      this.loadProducts(event);
                    }else{
                      this.nodata=true
                    }
                  },(err:any)=>{

                  }
                )
               }

  ngOnInit() {

  }

  loadProducts(event?){
    this.helper.showSpinner();
    this.service.GetOffers(this.page) .subscribe(
      (res:any)=>{
          this.offers=this.offers.concat(res['data']) 
          this.helper.hideSpinner()
      },(err:any)=>{
        this.helper.showSpinner();
      })
     
  }

  loadData(event){
    setTimeout(() => {
      this.page++ 
      this.service.GetOffers(this.page) .subscribe(
        (res:any)=>{
            this.offers=this.offers.concat(res['data']) 
            event.target.complete();
        },(err:any)=>{
          event.target.complete();
        })
          if (this.page===this.maximumLength) {
            event.target.disabled = true;
        }
    }, 500);
}


  cart(){
    this.router.navigateByUrl('/tabs/cart');
   }
 
   goBack(){
     this.location.back();
   }
 
   getCategoriesProducts(category_id){
     this.router.navigateByUrl('/category-products/'+category_id);
   }


   
   productDetails(id,name){
    this.dataService.setData(id, name);
    this.router.navigateByUrl('/product/'+id);  
  }

 

  Add_product_to_wishlist(product_id){
    this.service.Add_product_to_wishlist(product_id).subscribe(
      (res:any)=>{
        if(res.success==1){
          this.helper.presentToastWithOptions(this.translate.instant("product added to wishlist"));
        }
      },(err:any)=>{

      }
    )
  }

  addItemToCrt(productId){
    this.cartservice.increaseProduct();
    this.cartservice.Add_item_to_cart(productId,1).subscribe(
      (res:any)=>{
        if(res.success==1){
          this.helper.presentToastWithOptions(this.translate.instant("product added to cart"));
 
        }
      },(err:any)=>{

      }
    )

  }

  doRefresh($event){
  this.service.GetOffers(this.page).subscribe(
                  (res:any)=>{
                     if(res.data.length!=0){
                      this.maximumLength=res.data.length/10
                      console.log(this.maximumLength)
                      this.nodata=false
                      this.loadProducts(event);
                    }else{
                      this.nodata=true
                    }
                    $event.target.complete();
                  },(err:any)=>{
                    $event.target.complete();
                  }
                )
  }
}
