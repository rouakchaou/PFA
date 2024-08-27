import { Component, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Product } from 'src/app/model/product';
import { Delivery_person } from 'src/app/model/deliveryPerson';
import { DeliveryPersonService } from 'src/app/controller/delivery-person.service';
import { CommandService } from 'src/app/controller/command.service';
import {EditProfilePopupComponent} from "../edit-profile-popup/edit-profile-popup.component";
import {ValidateCommandPopupComponent} from "../validate-command-popup/validate-command-popup.component";

@Component({
  selector: 'app-command-details',
  templateUrl: './command-details.component.html',
  styleUrls: ['./command-details.component.css']
})
export class CommandDetailsComponent implements OnInit{
  commandProducts: Product[]=[];
  productsMap: Map<Product, Map<string, number>> = new Map();
  price: number;
  adress: number;
  town: number;
  delivery_persons: Delivery_person[] = [];
  selectedDeliveryPersonId: number;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private deliveryPersonService: DeliveryPersonService,
    private commandeService: CommandService
  ) { }

  ngOnInit(): void {
    this.getCommandProducts();
    this.price=this.data.command.total_price;
    this.adress=this.data.command.adresse;
    this.town=this.data.command.town;
    if (this.data.command.state==='on hold'){
      this.getDeliveryPersonsByTown(this.data.command.town);
    }
  }

  getCommandProducts(): void {
  this.data.command.command_lines.forEach((commandLine: any) => {
  const product = commandLine.product;
  const size = commandLine.size;
  const quantity = commandLine.quantity;

  let articleExiste = false;

  // Parcourt chaque entrée dans productsMap
  this.productsMap.forEach((value, key) => {
      // Vérifie si l'article est déjà dans productsMap
      if (key.id === product.id) {
          // Si l'article existe dans productsMap, vérifie si la taille correspondante est déjà présente
          if (value.has(size)) {
              // Si la taille existe déjà, incrémente simplement la quantité
              value.set(size, value.get(size)! + quantity);
          } else {
              // Sinon, ajoute une nouvelle entrée pour cette taille avec la quantité spécifiée
              value.set(size, quantity);
          }
          articleExiste = true;
      }
  });

  // Si l'article n'existe pas déjà dans productsMap, ajoute-le avec la taille spécifiée
  if (!articleExiste) {
      const newSizeMap = new Map<string, number>();
      newSizeMap.set(size, quantity);
      this.productsMap.set(product, newSizeMap);
  }
});
  this.getCommandProduits();
    console.log(this.productsMap);
  }

  getCommandProduits() {
    this.commandProducts = Array.from(this.productsMap.keys());
  }

  getDeliveryPersonsByTown(town: string) {
    this.deliveryPersonService.getDeliveryPersonsByTown(town).subscribe((data: Delivery_person[]) => {
      this.delivery_persons = data;
      console.log(this.delivery_persons);
    });
  }

  updateCommand(): void {
    this.commandeService.updateCommand(this.data.command.id, this.selectedDeliveryPersonId)
      .subscribe(
        () => {
          console.log('Command updated successfully');
        },
        error => {
          console.error('Failed to update command', error);
        }
      );
  }

  togglevalidatePopup() {
    const dialogRef = this.dialog.open(ValidateCommandPopupComponent, {
      width:'800px',
    });
  }

}
