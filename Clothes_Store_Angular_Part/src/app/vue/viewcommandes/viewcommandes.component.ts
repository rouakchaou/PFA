import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommandService } from 'src/app/controller/command.service';
import { Command } from 'src/app/model/command';
import { RegistrationService } from 'src/app/controller/registration.service';
import { User } from 'src/app/model/user';
import {MatDialog} from "@angular/material/dialog";
import { CommandDetailsComponent } from '../command-details/command-details.component';
@Component({
  selector: 'app-viewcommandes',
  templateUrl: './viewcommandes.component.html',
  styleUrls: ['./viewcommandes.component.css']
})
export class ViewcommandesComponent implements OnInit{
  
  commands: Command[] = [];
  users_name: string[] = [];
  users_surname: string[] = [];
  dataSource: MatTableDataSource<Command>;
  displayedColumns: string[] = ['id_commad', 'user_name','user_surname', 'date', 'state', 'view_details'];
  
  constructor(
    private commandeService: CommandService,
    private userService: RegistrationService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.getCommands();
  }

  getCommands() {
    this.commandeService.getAllCommands().subscribe((data: any[]) => {
      this.commands = data;
      this.dataSource = new MatTableDataSource(data);
      // let user_recovered : User;
      for (let i = 0; i < this.commands.length; i++) {
        const command = this.commands[i];
        const userId = command.user_id;
        this.userService.getUserById(userId)
        .subscribe(
          (user: User) => {
            // user_recovered = user;
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

  formatDateTime(dateTime: string): string {
    const date = new Date(dateTime);
    return date.toLocaleString();
  }

  toggleCommandPopup(command: Command) {
    const dialogRef = this.dialog.open(CommandDetailsComponent, {
      data: { command: command },
      // height:'900px',
    });
  }

}
