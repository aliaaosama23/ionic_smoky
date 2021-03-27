import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsseraddressesAddEditPageRoutingModule } from './usseraddresses-add-edit-routing.module';

import { UsseraddressesAddEditPage } from './usseraddresses-add-edit.page';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsseraddressesAddEditPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [UsseraddressesAddEditPage]
})
export class UsseraddressesAddEditPageModule {}
