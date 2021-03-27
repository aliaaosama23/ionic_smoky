import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmTabsPage } from './confirm-tabs.page';
const routes: Routes = [
  {
    path: '',
    component: ConfirmTabsPage,
    children: [
      {
        path: 'main',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabs/tabs.module').then(m => m.TabsPageModule)
          }
        ]
      },
      {
        path: 'confirm1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../confirm1/confirm1.module').then(m => m.Confirm1PageModule)
          }
        ]
      },
      {
        path: 'confirm2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../confirm2/confirm2.module').then(m => m.Confirm2PageModule)
          }
        ]
      },
      {
        path: 'confirm3',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../confirm3/confirm3.module').then(m => m.Confirm3PageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/confirm-tabs/confirm1',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmTabsPageRoutingModule {}
