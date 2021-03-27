import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Confirm1Page } from './confirm1.page';

const routes: Routes = [
  {
    path: '',
    component: Confirm1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Confirm1PageRoutingModule {}
