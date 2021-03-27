import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Confirm3Page } from './confirm3.page';

const routes: Routes = [
  {
    path: '',
    component: Confirm3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Confirm3PageRoutingModule {}
