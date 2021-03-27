import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { HelperService } from '../../services/helper/helper.service';
import { MainserviceService } from '../../services/mainservice/mainservice.service';
import { DataService } from '../../services/dataService/data.service';
import { CartService } from '../../services/cartService/cart.service';
import { Storage } from '@ionic/storage';
import { PopoverController } from '@ionic/angular';
import { FiltersPage } from '../filters/filters.page';
import { TranslateService } from '@ngx-translate/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.page.html',
  styleUrls: ['./category-products.page.scss'],
})
export class CategoryProductsPage implements OnInit {
  sort:string="name"
  order:string="ASC"
  noProducts:boolean
  catid:any
  catname:any
  catProducts:any[]=[]
  nodata:boolean
  cartItems:any[]=[]
  cartTotals:any[]=[]
  page:number=1
  maximumLength:number=0
  filterBy:any
  isGrid:boolean=true
  
  constructor(private activatedRoute: ActivatedRoute,private router: Router,private storage: Storage,
              public cartservice:CartService,private dataService: DataService,private translate: TranslateService,
              public helper:HelperService,public service:MainserviceService,public popoverController: PopoverController,
              private route: ActivatedRoute,private location: Location) { 
                  if (this.route.snapshot.data['data']) {
                    this.catname = this.route.snapshot.data['data'];
                  }
                  this.catid = this.activatedRoute.snapshot.paramMap.get('id');
            
                  this.service.Get_list_of_products_by_category_ID_all(this.catid).subscribe(
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

  loadProducts(event?){
    this.helper.showSpinner();
    this.service.Get_list_of_products_by_category_ID(this.catid,10,this.page,this.sort,this.order) .subscribe(
      (res:any)=>{
          this.catProducts=this.catProducts.concat(res['data']) 
        // if(event){
        //   event.target.complete();
        // }
          this.helper.hideSpinner()
      },(err:any)=>{
        this.helper.showSpinner();
      })
     
  }

  ngOnInit() {
 
  }

  loadData(event){
      setTimeout(() => {
        this.page++ 
        this.service.Get_list_of_products_by_category_ID(this.catid,10,this.page,this.sort,this.order) .subscribe(
          (res:any)=>{
              this.catProducts=this.catProducts.concat(res['data']) 
              event.target.complete();
          },(err:any)=>{
            event.target.complete();
          })
            if (this.page===this.maximumLength) {
              event.target.disabled = true;
          }
      }, 500);
  }

  
  productDetails(id,name){
    this.dataService.setData(id, name);
    this.router.navigateByUrl('/product/'+id);  
  }

  goBack(){
    this.location.back();
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
  
  toggleStyle(){
    this.isGrid= !this.isGrid
  }

  async presentPopover(ev: Event) {    
    const popover = await this.popoverController.create({
      component: FiltersPage,
      showBackdrop:false,
      event:ev,
      componentProps:{
        'name':'filters'
      }
    })
    popover.present()  
    await popover.onDidDismiss().then((data)=>{
      console.log(data.data)
      
       let filter=data.data
      console.log (filter.split('_'))
      // let filterobj={
      //    'sort':filter.split('_')[0],
      //     'order':filter.split('_')[1]
      // }
      this.sort=filter.split('_')[0];
      this.order=filter.split('_')[1]
      this.selectfilter( this.sort,this.order)
    })                 
}

    selectfilter(sort,order){      
    this.service._acustom_search(10,this.page,this.catid,sort,order).subscribe(
          (res:any)=>{
            if(res.success==1){
              this.catProducts=[]
              if(res.data.length!=0){
                this.catProducts= res.data
                this.noProducts=false
              }else{
                this.noProducts=true
              }       
            }
        },(err:any)=>{
          
        }
    )
  } 
  
  doRefresh($event){
    if (this.route.snapshot.data['data']) {
      this.catname = this.route.snapshot.data['data'];
    }
    this.catid = this.activatedRoute.snapshot.paramMap.get('id');

    this.service.Get_list_of_products_by_category_ID_all(this.catid).subscribe(
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

