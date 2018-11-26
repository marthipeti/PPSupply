import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MatToolbarModule, MatTabsModule, MatButtonModule, MatCardModule, MatGridListModule, MatListModule, MatTableModule, MatSelectModule, MatFormFieldModule } from '@angular/material';
import { RoutingModule } from './routing/routing.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    ProfilePageComponent,
    ProductPageComponent,
    ContactPageComponent,
    RegistrationPageComponent,
    CartPageComponent,
    ReservationFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    RoutingModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatTableModule,
    MatTabsModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
