import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmTabsPageRoutingModule } from './confirm-tabs-routing.module';

import { ConfirmTabsPage } from './confirm-tabs.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmTabsPageRoutingModule,
    TranslateModule
  ],
  declarations: [ConfirmTabsPage]
})
export class ConfirmTabsPageModule {}
