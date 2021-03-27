import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestContinuePageRoutingModule } from './guest-continue-routing.module';

import { GuestContinuePage } from './guest-continue.page';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuestContinuePageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [GuestContinuePage]
})
export class GuestContinuePageModule {}
