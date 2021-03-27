import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UseraddressesPage } from './useraddresses.page';

const routes: Routes = [
  {
    path: '',
    component: UseraddressesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UseraddressesPageRoutingModule {}
