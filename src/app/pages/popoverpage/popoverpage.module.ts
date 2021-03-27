import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopoverpagePageRoutingModule } from './popoverpage-routing.module';

import { PopoverpagePage } from './popoverpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopoverpagePageRoutingModule
  ],
  declarations: [PopoverpagePage]
})
export class PopoverpagePageModule {}
