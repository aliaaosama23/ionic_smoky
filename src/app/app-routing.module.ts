import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataResolverService } from './services/resolver/data-resolver.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'category-products/:id',
    resolve: {
      data: DataResolverService
    },
    loadChildren: () => import('./pages/category-products/category-products.module').then( m => m.CategoryProductsPageModule)
  },   
  {
    path: 'product/:id',
    resolve: {
      data: DataResolverService
    },
    loadChildren: () => import('./pages/product/product.module').then( m => m.ProductPageModule)
  }, 
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'userprofile',
    loadChildren: () => import('./pages/userprofile/userprofile.module').then( m => m.UserprofilePageModule)
  },
  {
    path: 'forgetpassword',
    loadChildren: () => import('./pages/forgetpassword/forgetpassword.module').then( m => m.ForgetpasswordPageModule)
  },
  {
    path: 'changepassword',
    loadChildren: () => import('./pages/changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
  },
  {
    path: 'popoverpage',
    loadChildren: () => import('./pages/popoverpage/popoverpage.module').then( m => m.PopoverpagePageModule)
  },
  {
    path: 'confirm-tabs',
    loadChildren: () => import('./pages/confirm-tabs/confirm-tabs.module').then( m => m.ConfirmTabsPageModule)
   },
   
   {
    path: 'languages',
    loadChildren: () => import('./pages/languages/languages.module').then( m => m.LanguagesPageModule)
   },
   
   {
    path: 'currency',
    loadChildren: () => import('./pages/currency/currency.module').then( m => m.CurrencyPageModule)
   },
  {
    path: 'aboutus/:info_id',
    loadChildren: () => import('./pages/aboutus/aboutus.module').then( m => m.AboutusPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'filters',
    loadChildren: () => import('./pages/filters/filters.module').then( m => m.FiltersPageModule)
  },
  {
    path: 'shipping-address',
    loadChildren: () => import('./pages/shipping-address/shipping-address.module').then( m => m.ShippingAddressPageModule)
  },
  {
    path: 'shipping-method',
    loadChildren: () => import('./pages/shipping-method/shipping-method.module').then( m => m.ShippingMethodPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'sub-category/:category_id',
    resolve: {
      data: DataResolverService
    },
    loadChildren: () => import('./pages/sub-category/sub-category.module').then( m => m.SubCategoryPageModule)
  },
  {
    path: 'compare',
    loadChildren: () => import('./pages/compare/compare.module').then( m => m.ComparePageModule)
  },
  {
    path: 'guest',
    loadChildren: () => import('./pages/guest/guest.module').then( m => m.GuestPageModule)
  },
  {
    path: 'guest-continue',
    loadChildren: () => import('./pages/guest-continue/guest-continue.module').then( m => m.GuestContinuePageModule)
  },
  {
    path: 'guest-continue1',
    loadChildren: () => import('./pages/guest-continue1/guest-continue1.module').then( m => m.GuestContinue1PageModule)
  },
  {
    path: 'offers',
    loadChildren: () => import('./pages/offers/offers.module').then( m => m.OffersPageModule)
  },
  {
    path: 'product-rating/:id',
    resolve: {
      data: DataResolverService
    },
    loadChildren: () => import('./pages/product-rating/product-rating.module').then( m => m.ProductRatingPageModule)
  },
  {
    path: 'userprofileedit',
    loadChildren: () => import('./pages/userprofileedit/userprofileedit.module').then( m => m.UserprofileeditPageModule)
  },
  {
    path: 'user-returns',
    loadChildren: () => import('./pages/user-returns/user-returns.module').then( m => m.UserReturnsPageModule)
  },
  {
    path: 'user-subscribe-newsletter',
    loadChildren: () => import('./pages/user-subscribe-newsletter/user-subscribe-newsletter.module').then( m => m.UserSubscribeNewsletterPageModule)
  },
  {
    path: 'useraddresses',
    loadChildren: () => import('./pages/useraddresses/useraddresses.module').then( m => m.UseraddressesPageModule)
  },
  {
    path: 'usseraddresses-add-edit/:id',
    loadChildren: () => import('./pages/usseraddresses-add-edit/usseraddresses-add-edit.module').then( m => m.UsseraddressesAddEditPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
