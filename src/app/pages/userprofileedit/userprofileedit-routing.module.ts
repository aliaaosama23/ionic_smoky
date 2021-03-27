import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserprofileeditPage } from './userprofileedit.page';

const routes: Routes = [
  {
    path: '',
    component: UserprofileeditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserprofileeditPageRoutingModule {}
