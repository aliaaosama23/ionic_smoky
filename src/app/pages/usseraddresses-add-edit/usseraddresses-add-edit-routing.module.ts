import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsseraddressesAddEditPage } from './usseraddresses-add-edit.page';

const routes: Routes = [
  {
    path: '',
    component: UsseraddressesAddEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsseraddressesAddEditPageRoutingModule {}
