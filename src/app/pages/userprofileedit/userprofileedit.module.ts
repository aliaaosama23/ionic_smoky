import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserprofileeditPageRoutingModule } from './userprofileedit-routing.module';

import { UserprofileeditPage } from './userprofileedit.page';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserprofileeditPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [UserprofileeditPage]
})
export class UserprofileeditPageModule {}
