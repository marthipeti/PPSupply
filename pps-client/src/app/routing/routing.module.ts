import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from '../product-page/product-page.component';
import { ProfilePageComponent } from '../profile-page/profile-page.component';
import { ContactPageComponent } from '../contact-page/contact-page.component';
import { CartPageComponent } from '../cart-page/cart-page.component';
import { LoginPageComponent } from '../login-page/login-page.component';



const routes: Route[] = [

  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductPageComponent },
  { path: 'products/products', component: ProductPageComponent },
  { path: 'products/products/products', redirectTo: '/products', pathMatch: 'full' },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'profile/profile', component: ProfilePageComponent },
  { path: 'profile/profile/profile', redirectTo: '/profile', pathMatch: 'full' },
  { path: 'contact', component: ContactPageComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'cart/cart', component: CartPageComponent },
  { path: 'cart/cart/cart', redirectTo: '/cart', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class RoutingModule { }
