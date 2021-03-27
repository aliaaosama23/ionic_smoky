import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { MainserviceService } from '../../services/mainservice/mainservice.service';
import { Router } from '@angular/router';
import { HelperService } from '../../services/helper/helper.service';
import { DataService } from '../../services/dataService/data.service';
import { Platform } from '@ionic/angular';
import { CartService } from '../../services/cartService/cart.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  cartNumber:number
  categories:any[]=[]
  dir:boolean
  constructor(private router:Router,private location: Location,private dataService: DataService,
              private cartService:CartService,private service:MainserviceService,
              private helper:HelperService,public plt:Platform) {
                 this.dir=this.plt.isRTL
                 this.cartService.getCountObservable().subscribe(cartItemsNumber=>{
                   this.cartNumber=cartItemsNumber
                 })
               }

  ngOnInit() {
    this.helper.showSpinner();
    this.service.GetCategories().subscribe(
      (Categories:any)=>{
        if(Categories.success==1){
          this.categories=Categories.data
          // category_id  name  image 
        }
        this.helper.hideSpinner()
      },(err:any)=>{
        this.helper.hideSpinner()
      }
    )
  }

  cart(){
   this.router.navigateByUrl('/tabs/cart')
  }

  goBack(){
    this.location.back();
  }

  categoryChildren(category_id,name){
    console.log(name)
    this.dataService.setData(category_id,name);
    this.router.navigateByUrl('/sub-category/'+category_id);
  }
}
