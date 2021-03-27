import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainserviceService } from '../../services/mainservice/mainservice.service';
import { HelperService } from '../../services/helper/helper.service';
import { Location } from "@angular/common";
import { CartService } from '../../services/cartService/cart.service';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from '../../services/dataService/data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  ispaused:boolean=true
  isAddToWishList:number=0
  pro_quantity:number=1
  productname: string=''
  productId:any;
  productDetails:any={}
  productCategory:any=''
  rating:any=''
  description:any=''
  quantity:number=1
  cartItems:any[]
  cartTotals:any[]
  pro_image:any
  images:any[]=[]
  dir:boolean
  RelatedProducts:any[]=[]
  ReviewStatus:boolean=false
  productReviews:any
  reviews:any[]=[]
  constructor(public helper:HelperService, private router:Router,private dataservice:DataService,
              private location: Location,private photoViewer: PhotoViewer,
              private activatedRoute: ActivatedRoute,public service:MainserviceService,
              private storage: Storage,public cartservice:CartService,private translate:TranslateService,
              private plt:Platform,private socialSharing: SocialSharing) { 
                   this.dir=this.plt.isRTL 
              }

              ngOnInit() {
                    if (this.activatedRoute.snapshot.data['data']) {
                      this.productname = this.activatedRoute.snapshot.data['data'];
                    }

                    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
                   
                    this.helper.showSpinner();
                    this.service.Get_product_details_by_ID(this.productId).subscribe(
                      (res:any)=>{
                        this.helper.hideSpinner();
                        if(res.success== 1){
                          this.productDetails=res.data
                          this.productCategory=this.productDetails.category[0].name
                          this.rating=this.productDetails.rating
                          this.description=this.productDetails.description
                          this.pro_image=this.productDetails.image
                          this.images=this.productDetails.images
                          this.productReviews=this.productDetails.reviews.review_total  
                          this.reviews=this.productDetails.reviews.reviews
                        }
                      },(err:any)=>{
                        this.helper.hideSpinner();
                      })

                    this.service.ProductsRelated(this.productId).subscribe(
                      (res:any)=>{
                        if(res.success==1){
                          this.RelatedProducts=res.data
                        }
                      }
                    )
                }

    productphotoViewer(imgUrl){
      this.photoViewer.show(imgUrl);
    }

    productphotoViewerImg(){
      this.photoViewer.show(this.pro_image);
    }

    share(){
      this.socialSharing.share(this.productname,'','',"http://www.smo-ky.com/index.php?route=product/product&product_id="+this.productId)
    }

    goBack(){
      this.location.back();
    }

    increaseQuantity(){
      this.quantity++
      this.cartservice.increaseProduct();
    }

    decreaseQuantity(){
      if(this.quantity>1){
        this.quantity--
      }  
      this.cartservice.decreaseProduct();
    }

    addToCart(){
      this.cartservice.increaseProduct();
      this.cartservice.Add_item_to_cart(this.productDetails.product_id,this.quantity).subscribe(
        (res:any)=>{
          if(res.success==1){
            this.helper.presentToastWithOptions(this.translate.instant("product added to cart"));
            // this.helper.showSpinner();
            // this.cartservice.GetCart(this.helper.Session).subscribe( 
            //   (res:any)=>{
            //     if(res.success== 1){
            //       if(res.data.length!=0){
            //           this.storage.get('Smoky_cartItems').then((val:any)=>{
            //             if(val!=null){
            //                this.cartItems=val
            //                this.cartItems.push(res.data.products[res.data.products.length-1])  
            //                this.storage.set('Smoky_cartItems', this.cartItems);
            //             }else{
            //                this.cartItems.push(res.data.products[res.data.products.length-1])
            //                this.storage.set('Smoky_cartItems', this.cartItems);
            //             }
            //           })
            //           this.storage.get('Smoky_cartTotals').then((val:any)=>{
            //             if(val!=null){
            //                this.cartTotals=val
            //                this.storage.set('Smoky_cartTotals', res.data.totals);
            //             }else{
            //                this.cartTotals=res.data.totals
            //                this.storage.set('Smoky_cartTotals', res.data.totals);
            //             }
            //           })
            //       }else{
            //         console.log("no items on cart")
            //       } 
            //     }
            //     this.helper.hideSpinner()
            //   },(err:any)=>{
            //     this.helper.hideSpinner()
            //   })  
          }
        },(err:any)=>{

        }
      )
    }

    Add_product_to_wishlist(){
      this.isAddToWishList=1
      this.ispaused=false
      this.service.Add_product_to_wishlist(this.productDetails.product_id).subscribe(
        (res:any)=>{
          if(res.success==1){
            this.helper.presentToastWithOptions(this.translate.instant("product added to wishlist"));
            this.isAddToWishList=2
            this.ispaused=true
          }
        },(err:any)=>{
  
        }
      )
    }
    
  Compare(){
    
    this.storage.get('smoky_compare_products').then((val:any)=>{
      if(val==null)
      {
        this.storage.set('smoky_compare_products',this.productDetails.product_id);
      }else{
        this.storage.set('smoky_compare_products',val+","+ this.productDetails.product_id);
      }

    })

    this.service.CompareProducts(this.productDetails.product_id).subscribe(
      (res:any)=>{
        if(res.success==1){
          this.helper.presentToastWithOptions(this.translate.instant("Product Added To compare"));
        }
      }
    )
  }

  productReview(){
    this.dataservice.setData(this.productDetails.product_id,this.productname);
     this.router.navigateByUrl('/product-rating/'+this.productDetails.product_id) 
  }

  RelatedproductDetails(id,name) {
    this.dataservice.setData(id, name);
    this.router.navigateByUrl('/product/'+id);  
  }

  expandReviews(){
    this.ReviewStatus=!this.ReviewStatus
    console.log(this.ReviewStatus)
  }
}
