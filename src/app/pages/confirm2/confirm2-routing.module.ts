import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Confirm2Page } from './confirm2.page';

const routes: Routes = [
  {
    path: '',
    component: Confirm2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Confirm2PageRoutingModule {}
