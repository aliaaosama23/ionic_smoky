import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { DataResolverService } from '../../services/resolver/data-resolver.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'main',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../main/main.module').then(m => m.MainPageModule)
           },
          // {
          //   path: ':id',
          //   resolve: {
          //     data: DataResolverService
          //   },
          //   loadChildren: () =>
          //     import('../product/product.module').then(m => m.ProductPageModule)
          // }
        ]
      },
      {
        path: 'cart',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../cart/cart.module').then(m => m.CartPageModule)
          }
        ]
      },
      {
        path: 'favourite',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../favourite/favourite.module').then(m => m.FavouritePageModule)
          }
        ]
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../search/search.module').then(m => m.SearchPageModule)
          }
        ]
      },
      {

        path: 'userprofile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../userprofile/userprofile.module').then(m => m.UserprofilePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/main',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/main',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
