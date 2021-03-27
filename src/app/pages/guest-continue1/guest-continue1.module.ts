import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestContinue1PageRoutingModule } from './guest-continue1-routing.module';

import { GuestContinue1Page } from './guest-continue1.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuestContinue1PageRoutingModule,
    TranslateModule
  ],
  declarations: [GuestContinue1Page]
})
export class GuestContinue1PageModule {}
