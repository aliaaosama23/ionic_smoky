import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserReturnsPageRoutingModule } from './user-returns-routing.module';

import { UserReturnsPage } from './user-returns.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserReturnsPageRoutingModule,
    TranslateModule 
  ],
  declarations: [UserReturnsPage]
})
export class UserReturnsPageModule {}
