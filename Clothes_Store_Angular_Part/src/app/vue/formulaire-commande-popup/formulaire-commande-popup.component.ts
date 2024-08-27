import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from "../../controller/registration.service";
import { User } from "../../model/user";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/controller/cart.service';
import { Product } from 'src/app/model/product';
import { CommandLine } from 'src/app/model/commandline';
import { CommandService } from 'src/app/controller/command.service';
import {AddToCartPopupComponent} from "../add-to-cart-popup/add-to-cart-popup.component";
import {SubmitCommandPopupComponent} from "../submit-command-popup/submit-command-popup.component";

@Component({
  selector: 'app-formulaire-commande-popup',
  templateUrl: './formulaire-commande-popup.component.html',
  styleUrls: ['./formulaire-commande-popup.component.css']
})
export class FormulaireCommandePopupComponent implements OnInit {
  orderForm: FormGroup;
  currentUser: User;
  userForm: FormGroup;
  msg: { status: number, message: string } = { status: 0, message: '' };
  user: User = new User();
  userId:number;

  constructor(
    public dialogRef: MatDialogRef<SubmitCommandPopupComponent>,
    private router: Router,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    // private http: HttpClient,
    private formBuilder: FormBuilder,
    // private fb: FormBuilder,
    private cartService:CartService,
    private commandService: CommandService,
    // private _route: Router,
    private registrationService: RegistrationService // Injection du service
  ) {
  }

  ngOnInit() {
    this.extractCommandLinesFromCart(this.cartService.getCartProduits()),
    this.orderForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      postalCode: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      town: ['', Validators.required]
    });

    const userId = this.registrationService.getUserId(this.registrationService.getToken()!);
    if (userId) {
      this.registrationService.getUserById(userId).subscribe(
        (user) => {
          this.currentUser = user;
          this.orderForm.patchValue({
            firstName: this.currentUser.name,
            lastName: this.currentUser.surname,
            phoneNumber: this.currentUser.phoneNumber,
          });
        },
        (error) => {
          console.error('Erreur lors de la récupération des données de l\'utilisateur :', error);
        }
      );
    } else {
      console.error('Impossible de récupérer l\'ID de l\'utilisateur actuellement connecté.');
    }
  }

  onSubmit() {
   this.addCommand(this.cartService.getCartProduits());
  }

  addCommand(cart: Map<Product, Map<string, number>>): void {
    const userId = this.registrationService.getUserId(this.registrationService.getToken()!);
    if (this.orderForm.valid) {
    const formData = this.orderForm.value;
    const command: any = {
      user_id: userId,
      state: "on hold",
      town: formData.town,
      date: new Date(),
      adresse: formData.address,
      postal_code: formData.postalCode,
      total_price: this.data.finalPrice,
      phone_number: formData.phoneNumber,
      delivery_person_id: null,
      // products: this.extractProductsFromCart(cart),
      command_lines: this.extractCommandLinesFromCart(cart)
    };
    this.commandService.addCommand(command).subscribe(response => {
      this.cartService.clearSession();
      this.SubmitCommandPopup();
      // console.log('Command added successfully', response);
    });
    }
  }

  extractProductsFromCart(cart: Map<Product, Map<string, number>>): Product[] {
    const products: Product[] = [];
    for (const product of cart.keys()) {
      products.push(product);
    }
    console.log(products)
    return products;
  }

  extractCommandLinesFromCart(cart: Map<Product, Map<string, number>>): CommandLine[] {
    const commandLines: CommandLine[] = [];
    cart.forEach((sizes, product) => {
      sizes.forEach((quantity, size) => {
        const commandLine = new CommandLine(product, size, quantity);
        commandLines.push(commandLine);
      });
    });
    console.log(commandLines)
    return commandLines;
  }

  SubmitCommandPopup() {
    const dialogRef = this.dialog.open(SubmitCommandPopupComponent, {
      width:'800px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.dialogRef.close();
    });
  }

}
