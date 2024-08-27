import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './vue/login/login.component';
import { SignupComponent } from './vue/signup/signup.component';
import { FormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './vue/home/home.component';
import { FooterComponent } from './vue/footer/footer.component';
import { HeaderComponent } from './vue/header/header.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderDashComponent } from './vue/header-dash/header-dash.component';
import { SidenavComponent } from './vue/sidenav/sidenav.component';
import { DashboardComponent } from './vue/dashboard/dashboard.component';
import { MatSelectModule } from '@angular/material/select';
import { AjoutProduitComponent } from './vue/ajout-produit/ajout-produit.component';

import { CartComponent } from './vue/cart/cart.component';
import { ListCategPopupComponent } from './vue/list-categ-popup/list-categ-popup.component';

import {MatDialogModule} from '@angular/material/dialog';
import { AddProductModalComponent } from './vue/add-product-modal/add-product-modal.component';
import { AddCategoryComponent } from './vue/add-category/add-category.component';
import { AddSousCategoryComponent } from './vue/add-sous-category/add-sous-category.component';
import { UserProfileComponent } from './vue/user-profile/user-profile.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DetailsProdPopupComponent } from './vue/details-prod-popup/details-prod-popup.component';
import { RegistrationService } from './controller/registration.service';
import { ViewproductsComponent } from './vue/viewproducts/viewproducts.component';
import { MatTableModule } from '@angular/material/table';
import { EditProductComponent } from './vue/edit-product/edit-product.component';
import { MatInputModule } from '@angular/material/input';
import { ViewcategoriesComponent } from './vue/viewcategories/viewcategories.component';
import { SubcategoriesComponent } from './vue/subcategories/subcategories.component';
import { DeletemodalComponent } from './vue/deletemodal/deletemodal.component';
import { ViewcommandesComponent } from './vue/viewcommandes/viewcommandes.component';
import { FavoritesComponent } from './vue/favorites/favorites.component';
import { MatTabsModule } from '@angular/material/tabs';

import { FormulaireCommandePopupComponent } from './vue/formulaire-commande-popup/formulaire-commande-popup.component';
import { DashPageComponent } from './vue/dash-page/dash-page.component';
import { CommandDetailsComponent } from './vue/command-details/command-details.component';
import {AddToCartPopupComponent} from "./vue/add-to-cart-popup/add-to-cart-popup.component";

import { DeliveryInterfaceComponent } from './vue/delivery-interface/delivery-interface.component';
import { AddDeliveryPersonComponent } from './vue/add-delivery-person/add-delivery-person.component';
import { SubmitCommandPopupComponent } from './vue/submit-command-popup/submit-command-popup.component';
import { CheckoutButtonCartPopupComponent } from './vue/checkout-button-cart-popup/checkout-button-cart-popup.component';
import { EditProfilePopupComponent } from './vue/edit-profile-popup/edit-profile-popup.component';
import { AddDeliveryPersonPopupComponent } from './vue/add-delivery-person-popup/add-delivery-person-popup.component';
import { ValidateCommandPopupComponent } from './vue/validate-command-popup/validate-command-popup.component';
import { DeliveryValidateCommandPopupComponent } from './vue/delivery-validate-command-popup/delivery-validate-command-popup.component';


@NgModule({
  declarations: [

    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    HeaderDashComponent,
    SidenavComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    AjoutProduitComponent,

    CartComponent,
    ListCategPopupComponent,
    AddProductModalComponent,
    AddCategoryComponent,
    AddSousCategoryComponent,
    DetailsProdPopupComponent,

    UserProfileComponent,
      ViewproductsComponent,
      EditProductComponent,
      ViewcategoriesComponent,
      SubcategoriesComponent,
      DeletemodalComponent,
      ViewcommandesComponent,
      FavoritesComponent,

      FormulaireCommandePopupComponent,
      DashPageComponent,
             CommandDetailsComponent,
             AddToCartPopupComponent,

             DeliveryInterfaceComponent,
             AddDeliveryPersonComponent,
             SubmitCommandPopupComponent,
             CheckoutButtonCartPopupComponent,
             EditProfilePopupComponent,
             AddDeliveryPersonPopupComponent,
             ValidateCommandPopupComponent,
             DeliveryValidateCommandPopupComponent,

  ],
  imports: [
    MatTabsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
       // * MATERIAL IMPORTS
     MatSidenavModule,
       MatToolbarModule,
       MatMenuModule,
       MatIconModule,
       MatDividerModule,
       MatListModule,
       MatFormFieldModule,
       MatSelectModule,
       MatDialogModule,

    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTableModule,
    MatInputModule
  ],
  providers: [
    RegistrationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
