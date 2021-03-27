import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Confirm1PageRoutingModule } from './confirm1-routing.module';

import { Confirm1Page } from './confirm1.page';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Confirm1PageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [Confirm1Page]
})
export class Confirm1PageModule {}
