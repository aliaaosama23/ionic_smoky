import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Confirm3PageRoutingModule } from './confirm3-routing.module';

import { Confirm3Page } from './confirm3.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Confirm3PageRoutingModule,
    TranslateModule
  ],
  declarations: [Confirm3Page]
})
export class Confirm3PageModule {}
