import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommandService } from 'src/app/controller/command.service';
import { Command } from 'src/app/model/command';
import { RegistrationService } from 'src/app/controller/registration.service';
import { User } from 'src/app/model/user';
import {MatDialog} from "@angular/material/dialog";
import { Router } from '@angular/router'
import {
  DeliveryValidateCommandPopupComponent
} from "../delivery-validate-command-popup/delivery-validate-command-popup.component";

@Component({
  selector: 'app-delivery-interface',
  templateUrl: './delivery-interface.component.html',
  styleUrls: ['./delivery-interface.component.css']
})
export class DeliveryInterfaceComponent implements OnInit{

  commands: Command[] = [];
  users_name: string[] = [];
  users_surname: string[] = [];
  dataSource: MatTableDataSource<Command>;
  displayedColumns: string[] = [ 'id_commad', 'user_name','user_surname','phone_number', 'date', 'adress', 'postal_code', 'done'];
  token: string | null;
  userId: number | null;

  constructor(
    private commandeService: CommandService,
    private userService: RegistrationService,
    public dialog: MatDialog,
    private router: Router,
    private registrationService: RegistrationService
    ) {}

  ngOnInit(): void {
    this.token = this.registrationService.getToken();
    if (this.token!=null){
      this.userId=this.registrationService.getUserId(this.token);
    }
    this.getCommands();
  }

  getDeliveryPersonName(): string | null {
    if (this.token!=null){
      return this.registrationService.getUserName(this.token);
    }
    else {
      return null
    }
  }

  logOut(): void{
    this.registrationService.logout();
    this.router.navigate(['/login'])
  }

  getCommands() {
    if (this.userId!=null){
      this.commandeService.getDeliveryPersonCommands(this.userId).subscribe((data: any[]) => {
        this.commands = data;
        console.log("hello",data)
        this.dataSource = new MatTableDataSource(data);
        for (let i = 0; i < this.commands.length; i++) {
          const command = this.commands[i];
          const userId = command.user_id;
          this.userService.getUserById(userId)
          .subscribe(
            (user: User) => {
              this.users_name[i]=user.name;
              this.users_surname[i]=user.surname;
            },
            (error: any) => {
              console.error('Error: ', error);
            }
          );
        }
      });
    }
  }

  formatDateTime(dateTime: string): string {
    const date = new Date(dateTime);
    return date.toLocaleString();
  }

  validateCommand(commandId: number): void{
      this.commandeService.validateCommand(commandId)
        .subscribe(
          () => {
            console.log('Command validated successfully');
          },
          error => {
            console.error('Failed to update command', error);
          }
        );
  }

  togglevalidatePopup() {
    const dialogRef = this.dialog.open(DeliveryValidateCommandPopupComponent, {
      width:'800px',
    });
    dialogRef.afterClosed().subscribe(result => {
      window.location.reload()
    });
  }

}

