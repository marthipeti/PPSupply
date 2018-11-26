import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { ProductPageComponent } from '../product-page/product-page.component';
import { ProfilePageComponent } from '../profile-page/profile-page.component';
import { RegistrationPageComponent } from '../registration-page/registration-page.component';
import { ContactPageComponent } from '../contact-page/contact-page.component';
import { CartPageComponent } from '../cart-page/cart-page.component';


const routes: Route[] = [
  { path: '', component: ProductPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'registration', component: RegistrationPageComponent }, 
  { path: 'contact', component: ContactPageComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'cart/cart', redirectTo: ''}  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class RoutingModule { }
