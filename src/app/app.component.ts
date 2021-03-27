import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserService } from './services/user/user.service';
import { DataService } from './services/dataService/data.service';
import { MainserviceService } from './services/mainservice/mainservice.service';
import { HelperService } from './services/helper/helper.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({ 
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  dir:string
  pages: any[];
  categories: any[];
  user_logined_in:boolean
  paneEnabled:boolean=true
  about:boolean=false
  lang=''
  AppDirection:any  
  menuSide:string
  constructor(
    private platform: Platform,public menuCtrl: MenuController,
    private splashScreen: SplashScreen,private user:UserService,
    private statusBar: StatusBar,private dataService: DataService,
    private service: MainserviceService,
    private storage: Storage,public router:Router,
    private helper: HelperService,private translate:TranslateService,
    public plt:Platform,

  ) {
    //this.plt.isRTL
    this.initializeApp(); 
   
    console.log("dirction is :"+this.dir)
    // check if login status changed
      this.helper.getloginobservalble().subscribe((val)=>{
        this.user_logined_in=val
      })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log(this.helper.direction)
   
       // set saved language
      
     

       this.storage.get('SELECTED_LANGUAGE').then(val=>{
         console.log('current language  :  '+val)
        if(val!=null){
          if(val=='ar'){
            console.log("current lang :  "+val)
            document.documentElement.dir='rtl'
            this.lang='ar'
            this.helper.changeDirection('rtl')
            this.menuCtrl.enable(true, 'custom');
            this.menuCtrl.enable(false, 'custom1');
          }else if(val=='en'){
            console.log("current lang :  "+val)
            document.documentElement.dir='ltr'
            this.lang='en'
            this.helper.changeDirection('ltr')
            this.menuCtrl.enable(true, 'custom1');
            this.menuCtrl.enable(false, 'custom');
          }
        }
      })
      
      this.helper.setInitailAppLanguage();

      this.helper.getdirectionobservalble().subscribe((currentDirection:any)=>{
        console.log( "direction from :  "+ currentDirection)
        this.AppDirection=currentDirection
      })

console.log( "current platform :  "+ this.platform.isRTL)
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        console.info(`Language change to ${event.lang}`);
        let element: HTMLElement = document.getElementById("main");
            if(event.lang=='en'){
              this.menuSide='end'
              document.documentElement.dir='ltr'
             
              this.menuCtrl.enable(true, 'custom1');
              this.menuCtrl.enable(false, 'custom');
            }
            if(event.lang=='ar'){
              this.menuSide='start'
              document.documentElement.dir='rtl'
              this.menuCtrl.enable(true, 'custom');
              this.menuCtrl.enable(false, 'custom1');
            }
        element.setAttribute('side', this.menuSide);
      });
    
     // document.documentElement.dir = 'rtl' //this.helper.direction;

      this.storage.get('Smoky_session').then((val:any)=>{
        console.log("user session"+val)
        if(val!=null){
          this.helper.SetSession(val);
        }else{
          this.user.GetSession().subscribe(
            (res: any) => {
               this.storage.set('Smoky_session', res.data.session);
               this.helper.SetSession(res.data.session);
            }, (err: any) => {
            }
          );
        }
      })

      this.service.GetCategories().subscribe(
        (Categories:any)=>{
          this.categories=Categories.data
        },(err:any)=>{

        })
        
      // check if user logined before
      this.storage.get('Smoky_loginedIn').then((val)=>{
        if(val!=null){  
            this.user_logined_in=val  
        }else{
          this.user_logined_in=false
        }
      })

       //set 'currency'
      this.storage.get('currency').then((val)=>{
        if(val!=null){  
           this.helper.set_currency(val)
        }else{
          this.storage.set('currency',"SAR")
          this.helper.set_currency("SAR")
        }
      })
     
     // this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#8B177A')
      this.splashScreen.hide();

     
    });
  }
  
  Home(){
    this.router.navigateByUrl('/')
    this.menuCtrl.close()
  }

  getCategoryProducts(id,name){
    this.dataService.setData(id,name);
    this.router.navigateByUrl('/category-products/'+id);
  }

  getOffers(){
    this.router.navigateByUrl('/offers');
  }

  contact(){
    this.router.navigateByUrl('/contact');
  }

  currencies(){
    this.router.navigateByUrl('/currency');
  }

  languages(){
    this.router.navigateByUrl('/languages');
  }

  aboutUs(){
    this.about=!this.about
  }

  AboutUs(info_id){
    this.router.navigateByUrl('/aboutus/'+info_id);
  }

  // privacy(){
  //   this.router.navigateByUrl('/privacy');
  // }

  // Brands(){

  // }

  // Rules(){

  // }

  signup_login(){
    this.menuCtrl.toggle(); 
    this.router.navigateByUrl('/login')
  }

  logout(){
    this.storage.set('Smoky_loginedIn',false)
    this.helper.showSpinner()
    this.user.Logs_out_current_logged_in_user_session().then(
      (res:any)=>{
        if(res.success==1){
            this.menuCtrl.toggle(); 
            this.router.navigateByUrl('/')
            this.helper.logout()
        }
        this.helper.hideSpinner()
      
      },(err:any)=>{
        this.helper.hideSpinner()
      }
    )
  }

  getCategories(){
    this.router.navigateByUrl('/categories')
  }

  getCompareProducts(){
    this.router.navigateByUrl('/compare')
  }

}
