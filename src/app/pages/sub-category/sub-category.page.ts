import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { MainserviceService } from '../../services/mainservice/mainservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from '../../services/helper/helper.service';
import { CartService } from '../../services/cartService/cart.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.page.html',
  styleUrls: ['./sub-category.page.scss'],
})
export class SubCategoryPage implements OnInit {

  cartNumber:number
  categories:any[]=[]
  catname:string=''
  categoryID:any
  constructor(private router:Router,private location: Location,private activatedRoute: ActivatedRoute,
              private service:MainserviceService,private helper:HelperService,private cartService:CartService) { }

  ngOnInit() {
    this.cartService.getCountObservable().subscribe(cartItemsNumber=>{
      this.cartNumber=cartItemsNumber
    })
    if (this.activatedRoute.snapshot.data['data']) {
      this.catname = this.activatedRoute.snapshot.data['data'];
    }
    console.log(this.catname)

    this.categoryID=this.activatedRoute.snapshot.paramMap.get('category_id')

    this.helper.showSpinner();
    this.service.GetCategoriesLevel(this.activatedRoute.snapshot.paramMap.get('category_id'),1).subscribe(
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

  getCategoriesProducts(category_id){
    this.router.navigateByUrl('/category-products/'+category_id);
  }

  
}
