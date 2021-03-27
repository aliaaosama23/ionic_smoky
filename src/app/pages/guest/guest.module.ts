import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuestPageRoutingModule } from './guest-routing.module';

import { GuestPage } from './guest.page';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuestPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [GuestPage]
})
export class GuestPageModule {}
