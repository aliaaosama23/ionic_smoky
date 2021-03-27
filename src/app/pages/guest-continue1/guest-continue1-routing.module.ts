import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestContinue1Page } from './guest-continue1.page';

const routes: Routes = [
  {
    path: '',
    component: GuestContinue1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestContinue1PageRoutingModule {}
