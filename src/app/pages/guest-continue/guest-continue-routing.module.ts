import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestContinuePage } from './guest-continue.page';

const routes: Routes = [
  {
    path: '',
    component: GuestContinuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestContinuePageRoutingModule {}
