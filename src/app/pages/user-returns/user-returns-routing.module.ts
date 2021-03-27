import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserReturnsPage } from './user-returns.page';

const routes: Routes = [
  {
    path: '',
    component: UserReturnsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserReturnsPageRoutingModule {}
