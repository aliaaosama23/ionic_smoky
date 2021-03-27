import { Component, OnInit } from '@angular/core';
import { MainserviceService } from '../../services/mainservice/mainservice.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { CartService } from '../../services/cartService/cart.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.page.html',
  styleUrls: ['./compare.page.scss'],
})
export class ComparePage implements OnInit {
  noProducts:boolean
  cartNumber:number
  products:any[]=[]
  constructor(private service:MainserviceService,private storage: Storage,
              private router:Router,private location: Location,
              private cartService:CartService) { }

  ngOnInit() {
    this.cartService.getCountObservable().subscribe(cartItemsNumber=>{
      this.cartNumber=cartItemsNumber
    })

    this.storage.get('smoky_compare_products').then((val:string)=>{
       if(val!=null){
        this.noProducts=false
      let compareProducts=   val.split(",")
        for(let i=0;i<compareProducts.length;i++){
          this.service.Get_product_details_by_ID(compareProducts[i]).subscribe(
            (res:any)=>{
               if(res.success==1){
                 this.products.push(res.data)
               }

               console.log(JSON.stringify(this.products))
            },(err:any)=>{

            })
        }    
       }else{
         this.noProducts=true
       }
    })
    
  }

  cart(){
    this.router.navigateByUrl('/cart');
  }

  goBack(){
    this.location.back();
  }
}
