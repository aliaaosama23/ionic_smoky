import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { ToastController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
const  LNG_KEY='SELECTED_LANGUAGE'

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  direction=""
  selected=''
  BaseUrl: string;
  SecretKey: string;
  Session: string;
  loading: any;
  private logined=new BehaviorSubject(false);
  private APPcurrency=new BehaviorSubject("SAR");
  private AppDirection=new BehaviorSubject(null);
  loginedIn:boolean
  err_msg:string
  currency:any
  language:any
  cartItems:number
  constructor(public toastController: ToastController,public loadingController: LoadingController,
              private spinnerDialog: SpinnerDialog,private translate:TranslateService,
              private storage:Storage) { 

                
  }

  setCartItems(val){
    this.cartItems=val
  }

  getCartItems(){
    return this.cartItems;
  }
  setInitailAppLanguage(){
    
    this.storage.get(LNG_KEY).then(val=>{
      console.log(val)
      if(val!=null){
        this.set_language(val)
        this.selected=val;
        
      }else{
        let language=this.translate.getBrowserLang();
        console.log(language)
        this.translate.setDefaultLang(language)
        this.set_language(language)
        this.selected=language;
      }
    })
  }

  set_language(va){
    this.translate.use(va)
    this.translate.setDefaultLang(va)
    this.selected=va;
    this.storage.set(LNG_KEY,va)
    if(va=='en'){
      document.documentElement.dir='ltr'
      this.set_direction('ltr')
    }
    if(va=='ar'){
      document.documentElement.dir='rtl'
      this.set_direction('rtl')
    }
  //  window.location.reload()
  
  }

  set_direction(va)
    {
      console.log(va)
      this.direction=va
    }

//------------------ login-------------//
        getLogin():boolean{
          return this.logined.getValue()
        }

        getloginobservalble():Observable<boolean>{
          return this.logined.asObservable();
        }

        login(){
          this.logined.next(true)
        }

        logout(){
          this.logined.next(false)
        }
      
//---------------- currency ------------//
        getcurrency():string{
          return this.APPcurrency.getValue()
        }

        getcurrencyobservalble():Observable<string>{
          return this.APPcurrency.asObservable();
        }

        changeCurrency(va){
          this.APPcurrency.next(va)
        }

//---------------- direction ------------//
      
  getdirectionobservalble():Observable<string>{
    return this.AppDirection.asObservable();
  }

  changeDirection(va){
    this.AppDirection.next(va)
    this.direction=va
  }

  SetSession(val){
    this.Session=val;
    console.log("user session:"+val);
  }
  
  set_err_msg(va){
    this.err_msg=va
  }

  set_currency(va){
    this.currency=va
  }

  async presentLoading() {
   this.loading = await this.loadingController.create({
      spinner:"lines",
      backdropDismiss: true
    });
    await this.loading.present();
  }

  async dissmisLoading() {
    await this.loading.dismiss();
    console.log('Loading dismissed!');
  }

  showSpinner(){
    this.spinnerDialog.show();
  }

  hideSpinner(){
    this.spinnerDialog.hide();
  }

  async presentToastWithOptions(message) {
    const toast = await this.toastController.create({
      message: message,
      position: 'bottom',
      duration: 3000,
      color:"primary"
    });
    toast.present();
  }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      //console.error('An error occurred:', error.error.message);
      console.log(error.error.message)
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
    //   console.error(
    //     `Backend returned code ${error.status}, ` +
    //     `body was: ${error.error}`);
    console.log(error.status)
    console.log(error.error)
     }
  
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
