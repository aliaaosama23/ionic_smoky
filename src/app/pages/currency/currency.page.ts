import { Component, OnInit } from '@angular/core';
import { MainserviceService } from '../../services/mainservice/mainservice.service';
import { HelperService } from '../../services/helper/helper.service';
import { Location } from "@angular/common";
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.page.html',
  styleUrls: ['./currency.page.scss'],
})
export class CurrencyPage implements OnInit {
  currencies:any[]
  currency:any
  constructor(private service:MainserviceService,private helper:HelperService,private route:Router,
              private location: Location, private storage: Storage,private translate:TranslateService) 
              { }

                  ngOnInit() {
                    this.helper.showSpinner()
                    this.service.product_classes().subscribe(
                      (classes:any)=>{
                          if(classes.success==1){
                            this.currencies= classes.data.currencies
                          }
                          this.helper.hideSpinner()
                      },(err:any)=>{
                        this.helper.hideSpinner()
                      })
                  }

                  goBack(){
                    this.location.back();
                  }

                  change_currency(){
                    this.helper.set_currency(this.currency)
                    this.helper.changeCurrency(this.currency)
                    this.storage.set('currency',this.currency)
                    // this.helper.presentToastWithOptions(this.translate.instant("currency changed"))
                    // setTimeout(()=>{
                    //   this.route.navigateByUrl('/')
                    // },3000) 
                    window.location.reload()
                  }

}
