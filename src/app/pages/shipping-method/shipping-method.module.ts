import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShippingMethodPageRoutingModule } from './shipping-method-routing.module';

import { ShippingMethodPage } from './shipping-method.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShippingMethodPageRoutingModule,
    TranslateModule
  ],
  declarations: [ShippingMethodPage]
})
export class ShippingMethodPageModule {}
