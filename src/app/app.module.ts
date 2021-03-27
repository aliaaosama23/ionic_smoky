import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule ,HttpClient} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PopoverpagePageModule } from './pages/popoverpage/popoverpage.module';
import { FiltersPageModule } from './pages/filters/filters.module';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(),
     AppRoutingModule,
     PopoverpagePageModule,
     FiltersPageModule,
     HttpClientModule,
     IonicStorageModule.forRoot(), 
     TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
     ReactiveFormsModule,
     FormsModule
    ],
     
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SpinnerDialog,
    GooglePlus,
    SpeechRecognition,
    SocialSharing,
    PhotoViewer,
    FingerprintAIO,
    Facebook
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
