import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserSubscribeNewsletterPage } from './user-subscribe-newsletter.page';

const routes: Routes = [
  {
    path: '',
    component: UserSubscribeNewsletterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserSubscribeNewsletterPageRoutingModule {}
