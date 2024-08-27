import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './vue/signup/signup.component';
import { LoginComponent } from './vue/login/login.component';
import { HomeComponent } from './vue/home/home.component';
import { DashboardComponent } from './vue/dashboard/dashboard.component';
import { CartComponent } from './vue/cart/cart.component';
import { UserProfileComponent } from './vue/user-profile/user-profile.component';
import { EditProductComponent } from './vue/edit-product/edit-product.component';
import { FavoritesComponent } from './vue/favorites/favorites.component';
import { DeliveryInterfaceComponent } from './vue/delivery-interface/delivery-interface.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  {path:'cart', component:CartComponent} ,
  {path:'profile', component:UserProfileComponent} ,
  { path: 'edit-product/:id', component: EditProductComponent } ,
  { path: 'favorites', component: FavoritesComponent },
  { path: 'deliveryInterface', component: DeliveryInterfaceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
