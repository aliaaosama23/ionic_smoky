import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UseraddressesPageRoutingModule } from './useraddresses-routing.module';

import { UseraddressesPage } from './useraddresses.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UseraddressesPageRoutingModule,
    TranslateModule
  ],
  declarations: [UseraddressesPage]
})
export class UseraddressesPageModule {}
