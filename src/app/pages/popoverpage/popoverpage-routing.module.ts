import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopoverpagePage } from './popoverpage.page';

const routes: Routes = [
  {
    path: '',
    component: PopoverpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopoverpagePageRoutingModule {}
