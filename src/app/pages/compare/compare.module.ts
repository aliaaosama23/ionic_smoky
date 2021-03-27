import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComparePageRoutingModule } from './compare-routing.module';

import { ComparePage } from './compare.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComparePageRoutingModule,
    TranslateModule
  ],
  declarations: [ComparePage]
})
export class ComparePageModule {}
