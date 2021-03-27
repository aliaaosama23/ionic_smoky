import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserSubscribeNewsletterPageRoutingModule } from './user-subscribe-newsletter-routing.module';

import { UserSubscribeNewsletterPage } from './user-subscribe-newsletter.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserSubscribeNewsletterPageRoutingModule,
    TranslateModule 
  ],
  declarations: [UserSubscribeNewsletterPage]
})
export class UserSubscribeNewsletterPageModule {}
