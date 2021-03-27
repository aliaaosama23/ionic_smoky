import { Component, OnInit } from '@angular/core';
import { MainserviceService } from '../../services/mainservice/mainservice.service';
import { HelperService } from '../../services/helper/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {
  wishProducts:any[]
  data:any[]
  wishlistEmpty:boolean
  constructor(public service:MainserviceService,public router:Router, public helper:HelperService) {
 
   }

  ngOnInit() {
    this.helper.showSpinner();
    this.service.Get_wishlist().subscribe( 
      (res:any)=>{
        if(res.success== 1){
            if(res.data.length!=0){
              this.wishProducts=res.data 
              this.wishlistEmpty=false 
            }else{
              this.wishlistEmpty=true
            }
          
        }
        this.helper.hideSpinner()
      },(err:any)=>{
        this.helper.hideSpinner()
      }
    )
  }

  editFav(){
    this.router.navigateByUrl('/favourite-edit');  
  }

  productDetails(id){
    this.router.navigateByUrl('/tabs/main/'+id);  
  }

  removeItem(id){
    this.service.Remove_product_from_wishlist(id).subscribe(
      (res:any)=>{
         if(res.success==1){
          this.helper.showSpinner();
          this.service.Get_wishlist().subscribe( 
            (res:any)=>{
              if(res.success== 1){
                if(res.data.length!=0){
                  this.wishProducts=res.data 
                  this.wishlistEmpty=false 
                }else{
                  this.wishlistEmpty=true
                }
              }
              this.helper.hideSpinner()
            },(err:any)=>{
              this.helper.hideSpinner()
            }
          )
         }
      },(err:any)=>{

      }
    )
  }
  doRefresh($event){
    this.service.Get_wishlist().subscribe( 
      (res:any)=>{
        if(res.success== 1){
          this.wishProducts=res.data  
        }
       $event.target.complete()
      },(err:any)=>{
        $event.target.complete()
      }
    )

  }
}
