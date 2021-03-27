import { Component, OnInit } from '@angular/core';
import { MainserviceService } from '../../services/mainservice/mainservice.service';
import { HelperService } from '../../services/helper/helper.service';
import { Router } from '@angular/router';
import { DataService } from '../../services/dataService/data.service';
import { NavController, MenuController, Platform } from '@ionic/angular';
import { CartService } from '../../services/cartService/cart.service';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  symbol:any
  priceRange:any
  search1:any
  ispaused:boolean=true
  isAddToWishList:number=0
 cartItems:any[]=[]
 cartTotals:any[]=[]
 status:boolean=false
 slides:any[]=[];
 categories:any[]=[]
 products_latest:any[]=[]
 products_special:any[]=[]
 manufacturers:any[]=[]
 ProductsBestsellers:any[]=[]
 slideOpts = {
  initialSlide: 1,
  speed: 400,
  autoplay: {
    delay: 3000
    }
};
slideOpts1= {
  initialSlide: 0,
  speed: 400,
  slidesPerView: 2,
  spaceBetween:10
};
slideOpts2= {
  initialSlide: 0,
  speed: 400,
  slidesPerView: 2,
};
dir:boolean
  constructor(public navCtrl:NavController, public service:MainserviceService,private translate: TranslateService,
              public cartservice:CartService,private storage: Storage,private menuCtrl:MenuController,
              public plt:Platform,private dataService: DataService,public helper:HelperService,
              private router: Router) {
              
                    this.dir=this.plt.isRTL
                     if(this.dir==true){
                      this.menuCtrl.enable(true, 'custom');
                      this.menuCtrl.enable(false, 'custom1');
                     }else{
                      this.menuCtrl.enable(true, 'custom1');
                      this.menuCtrl.enable(false, 'custom');
                     }

                    this.search1=this.translate.instant("search_for_product")
 
                    this.helper.showSpinner();
                    this.service.GetSlideshows().subscribe(
                      (slideshows:any)=>{
                        this.slides=slideshows.data[0].banners
                            this.service.GetBannerById(16).subscribe(
                              (Categories:any)=>{
                                this.categories=Categories.data
                                    this.service.LatestProducts().subscribe(
                                      (products_latest:any)=>{
                                        this.helper.hideSpinner();
                                         this.products_latest=products_latest.data
                                         this.service.GetSpecials().subscribe(
                                          (res:any)=>{
                                            this.helper.hideSpinner();
                                             this.products_special=res.data
                                             this.service.ProductsBestsellers().subscribe(
                                              (res:any)=>{
                                                this.helper.hideSpinner();
                                                 this.ProductsBestsellers=res.data
                                                    
                                              },(err:any)=>{
                                                this.helper.hideSpinner();
                                              }
                                            )
                                          },(err:any)=>{
                                            this.helper.hideSpinner();
                                          }
                                        )
                                      },(err:any)=>{
                                        this.helper.hideSpinner();
                                      }
                                    )
                              },(err:any)=>{
                                this.helper.hideSpinner();
                              }
                            )
                      },(err:any)=>{
                        this.helper.hideSpinner();
                      }
                    )
              }

    ionViewDidEnter(){
      this.menuCtrl.enable(true,'custom')
      this.search1=this.translate.instant("search_for_product")
 
      this.helper.showSpinner();
      this.service.GetSlideshows().subscribe(
        (slideshows:any)=>{
          this.slides=slideshows.data[0].banners
              this.service.GetBannerById(16).subscribe(
                (Categories:any)=>{
                  this.categories=Categories.data
                      this.service.LatestProducts().subscribe(
                        (products_latest:any)=>{
                          this.helper.hideSpinner();
                           this.products_latest=products_latest.data
                           this.service.GetSpecials().subscribe(
                            (res:any)=>{
                              this.helper.hideSpinner();
                               this.products_special=res.data
                               this.service.ProductsBestsellers().subscribe(
                                (res:any)=>{
                                  this.helper.hideSpinner();
                                   this.ProductsBestsellers=res.data
                                      
                                },(err:any)=>{
                                  this.helper.hideSpinner();
                                }
                              )
                            },(err:any)=>{
                              this.helper.hideSpinner();
                            }
                          )
                        },(err:any)=>{
                          this.helper.hideSpinner();
                        }
                      )
                },(err:any)=>{
                  this.helper.hideSpinner();
                }
              )
        },(err:any)=>{
          this.helper.hideSpinner();
        }
      )
    }
  
  ngOnInit() {
    this.search1=this.translate.instant("search_for_product")
 
    this.helper.showSpinner();
    this.service.GetSlideshows().subscribe(
      (slideshows:any)=>{
        this.slides=slideshows.data[0].banners
            this.service.GetBannerById(16).subscribe(
              (Categories:any)=>{
                this.categories=Categories.data
                    this.service.LatestProducts().subscribe(
                      (products_latest:any)=>{
                        this.helper.hideSpinner();
                         this.products_latest=products_latest.data
                         this.service.GetSpecials().subscribe(
                          (res:any)=>{
                            this.helper.hideSpinner();
                             this.products_special=res.data
                             this.service.ProductsBestsellers().subscribe(
                              (res:any)=>{
                                this.helper.hideSpinner();
                                 this.ProductsBestsellers=res.data
                                    
                              },(err:any)=>{
                                this.helper.hideSpinner();
                              }
                            )
                          },(err:any)=>{
                            this.helper.hideSpinner();
                          }
                        )
                      },(err:any)=>{
                        this.helper.hideSpinner();
                      }
                    )
              },(err:any)=>{
                this.helper.hideSpinner();
              }
            )
      },(err:any)=>{
        this.helper.hideSpinner();
      }
    )
         
  }


range(){


}


  refresh(){
    this.search1=this.translate.instant("search_for_product")
 
    this.helper.showSpinner();
    this.service.GetSlideshows().subscribe(
      (slideshows:any)=>{
        this.slides=slideshows.data[0].banners
            this.service.GetBannerById(16).subscribe(
              (Categories:any)=>{
                this.categories=Categories.data
                    this.service.LatestProducts().subscribe(
                      (products_latest:any)=>{
                        this.helper.hideSpinner();
                         this.products_latest=products_latest.data
                         this.service.GetSpecials().subscribe(
                          (res:any)=>{
                            this.helper.hideSpinner();
                             this.products_special=res.data
                             this.service.ProductsBestsellers().subscribe(
                              (res:any)=>{
                                this.helper.hideSpinner();
                                 this.ProductsBestsellers=res.data
                                    
                              },(err:any)=>{
                                this.helper.hideSpinner();
                              }
                            )
                          },(err:any)=>{
                            this.helper.hideSpinner();
                          }
                        )
                      },(err:any)=>{
                        this.helper.hideSpinner();
                      }
                    )
              },(err:any)=>{
                this.helper.hideSpinner();
              }
            )
      },(err:any)=>{
        this.helper.hideSpinner();
      }
    )
  }

  onInput()
  {
    this.router.navigateByUrl('/tabs/search');  
  }

  productDetails(id,name) {
    this.dataService.setData(id, name);
    this.router.navigateByUrl('/product/'+id);  
  }

  addItemToCart(productId){
    this.cartservice.increaseProduct();
    this.cartservice.Add_item_to_cart(productId,1).subscribe(
      (res:any)=>{
        if(res.success==1){
          this.helper.presentToastWithOptions(this.translate.instant("product added to cart"));
         
        }
      },(err:any)=>{

      })
  }

  Add_product_to_wishlist(product_id){
    this.service.Add_product_to_wishlist(product_id).subscribe(
      (res:any)=>{
        if(res.success==1){
          this.isAddToWishList=2
          this.ispaused=true
         this.helper.presentToastWithOptions(this.translate.instant("product added to wishlist"));
        }
      },(err:any)=>{

      }
    )
  }

  Remove_product_from_wishlist(product_id){
    this.service.Add_product_to_wishlist(product_id).subscribe(
      (res:any)=>{
          if(res.success==1){
          this.helper.presentToastWithOptions(this.translate.instant("product removed from wishlist"));
        }
      },(err:any)=>{

      }
    )
  }

  getCategoryProducts(id,name){
    this.dataService.setData(id,name);
    this.router.navigateByUrl('/category-products/'+id)
  }

  doRefresh($event){  
    this.service.GetSlideshows().subscribe(
      (slideshows:any)=>{
        this.slides=slideshows.data[0].banners

            this.service.GetCategories().subscribe(
              (Categories:any)=>{
                this.categories=Categories.data
                    // get list of latest products
                    this.service.LatestProducts().subscribe(
                      (res:any)=>{
                        $event.target.complete();
                         this.products_latest=res.data

                         this.service.GetSpecials().subscribe(
                          (res:any)=>{
                            $event.target.complete();
                             this.products_special=res.data
                          },(err:any)=>{
                            $event.target.complete();
                          }
                        )
                      },(err:any)=>{
                        $event.target.complete();
                      }
                    )
              },(err:any)=>{
                $event.target.complete();
              }
            )
      },(err:any)=>{
        $event.target.complete();
      }
    )
  }

  Compare(product_id){
    this.service.CompareProducts(product_id).subscribe(
      (res:any)=>{
        if(res.success==1){
          
        }
      }
    )
  }
}
