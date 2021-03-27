import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Confirm2PageRoutingModule } from './confirm2-routing.module';

import { Confirm2Page } from './confirm2.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Confirm2PageRoutingModule,
    TranslateModule 
  ],
  declarations: [Confirm2Page]
})
export class Confirm2PageModule {}
