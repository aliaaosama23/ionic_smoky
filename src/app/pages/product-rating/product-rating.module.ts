import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductRatingPageRoutingModule } from './product-rating-routing.module';

import { ProductRatingPage } from './product-rating.page';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicRatingModule } from 'ionic4-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductRatingPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule ,
    IonicRatingModule
  ],
  declarations: [ProductRatingPage]
})
export class ProductRatingPageModule {}
