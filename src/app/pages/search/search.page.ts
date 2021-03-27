import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { HelperService } from '../../services/helper/helper.service';
import { MainserviceService } from '../../services/mainservice/mainservice.service';
import { DataService } from '../../services/dataService/data.service';
import { CartService } from '../../services/cartService/cart.service';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { FiltersPage } from '../filters/filters.page';
import { PopoverController } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  mySearchText:String=''
  matches:String[]
  sort:string='name'
  order:string='ASC'
  isGrid:boolean=true
  search_word:any
  resultproducts:any[]=[]
  nodata:boolean=true
  page:number=1
  maximumLength:number=0
  searchText:String
  constructor(private location: Location,public service:MainserviceService,private translate:TranslateService,private cd:ChangeDetectorRef,
              public helper:HelperService,private cartservice:CartService,public popoverController: PopoverController,
              private router: Router,private dataService: DataService,private speechRecognition: SpeechRecognition
              ,private storage: Storage){ }

              ngOnInit() {
                this.search_word=this.translate.instant("searchword")   
                  // Check permission
                  this.speechRecognition.hasPermission()
                  .then((hasPermission: boolean) => {
                    if(!hasPermission){
                      // Request permissions
                        this.speechRecognition.requestPermission()
                        .then(
                          () => { },
                          () => console.log('Denied')
                        )
                    }
                  })
              }


              productDetails(id,name){
                this.dataService.setData(id, name);
                this.router.navigateByUrl('/product/'+id);  
              }

              search(){
                this.stop()
                this.helper.showSpinner()
                // get all result the actual length of the array retuned-- all pages
                this.service.Searchwithallpages(this.mySearchText,this.sort,this.order).subscribe(
                  (res:any)=>{
                    this.maximumLength=res.data.length/10
                  }
                )
                this.service.Search(this.mySearchText,10,this.page,this.sort,this.order).subscribe(
                  (res:any)=>{
                    if(res.success==1){
                      if(res.data.length==0){
                        this.nodata=true
                      }else{
                        this.resultproducts=res.data
                        this.nodata=false
                      }
                        this.helper.hideSpinner()
                    }
                  },(err:any)=>{
                  })   
              }
              
              onInput(ev:any){
                console.log(ev.target.value)
                this.mySearchText=ev.target.value   
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

                  })
              }

              searchwithsound(){
                this.storage.get('SELECTED_LANGUAGE').then(lang=>{
                  if(lang!=null){
                     if(lang=='en'){
                          this.speechRecognition.startListening({"language":"en-US"}).subscribe(
                            (res:any)=>{
                              console.log(JSON.stringify(res))
                              this.matches=res
                              this.cd.detectChanges()
                                this.mySearchText= this.matches[0]
                            }
                          )
                     } 
                     if(lang=='ar'){
                      this.speechRecognition.startListening({"language": "ar-SA"}).subscribe(
                        (res:any)=>{
                          console.log(JSON.stringify(res))
                          this.matches=res
                          this.cd.detectChanges()
                            this.mySearchText= this.matches[0]
                        }
                      )
                 } 
                }else{
                  this.speechRecognition.startListening({"language": "ar-SA"}).subscribe(
                    (res:any)=>{
                      console.log(JSON.stringify(res))
                      this.matches=res
                      this.cd.detectChanges()
                        this.mySearchText= this.matches[0]
                    }
                  )
                }
              })
              }

              stop(){
                this.speechRecognition.stopListening()
              }

  _searchwithsound(){
    this.speechRecognition.isRecognitionAvailable()

// Check feature available
this.speechRecognition.isRecognitionAvailable()
  .then((available: boolean) => console.log(available))

    // Start the recognition process
    let options={
      language:'ar',
      matches:5,
      showPartial:true
    } 
    this.speechRecognition.startListening(options)
      .subscribe(
        (matches: string[]) => {
          console.log("matches" +JSON.stringify(matches))
        },
        (onerror) => console.log('error:', onerror)
      )

      // Stop the recognition process (iOS only)
      //this.speechRecognition.stopListening()

      // Get the list of supported languages
      this.speechRecognition.getSupportedLanguages()
        .then(
          (languages: string[]) => console.log(languages),
          (error) => console.log(error)
        )

        // Check permission
        this.speechRecognition.hasPermission()
          .then((hasPermission: boolean) => console.log(hasPermission))

        // Request permissions
        this.speechRecognition.requestPermission()
          .then(
            () => console.log('Granted'),
            () => console.log('Denied')
          )
         

  }

  loadData(event){
    setTimeout(() => {
      this.page++ 
      this.service.Search(this.mySearchText,10,this.page,this.sort,this.order) .subscribe(
        (res:any)=>{
            this.resultproducts=this.resultproducts.concat(res['data']) 
            event.target.complete();
        },(err:any)=>{
          event.target.complete();
        })
          if (this.page===this.maximumLength) {
            event.target.disabled = true;
        }
    }, 500);
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
    console.log(this.isGrid)
    this.isGrid=!this.isGrid
  }

  async presentPopover(ev: Event) {  
    if(this.mySearchText!=''){
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
         let filter=data.data
        console.log (filter.split('_'))
        let filterobj={
           'sort':filter.split('_')[0],
            'order':filter.split('_')[1]
        }
        this.sort=filter.split('_')[0]
        this.order=filter.split('_')[1]
        this.selectfilter()
      })      
    }else{
      this.helper.presentToastWithOptions(this.translate.instant('choose search text frist'))
    } 
               
}
  selectfilter(){
        this.helper.showSpinner()
        this.service.Search_custom(this.mySearchText,10,this.page,this.sort,this.order).subscribe(
          (res:any)=>{
            if(res.success==1){
              if(res.data.length==0){
                this.nodata=true
              }else{
                this.resultproducts=res.data
                this.nodata=false
              }
                this.helper.hideSpinner()
            }
          },(err:any)=>{
          }) 
  } 
}
