import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router'
import { RegistrationService } from 'src/app/controller/registration.service';
@Component({
  selector: 'app-header-dash',
  templateUrl: './header-dash.component.html',
  styleUrls: ['./header-dash.component.css']
})
export class HeaderDashComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private registrationService: RegistrationService
  ) {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  getAdminName(): string | null {
    let token =this.registrationService.getToken();
    if (token!=null){
      return this.registrationService.getUserName(token);
    }
    else {
      return null
    }
  }

  logOut(): void{
    this.registrationService.logout();
    this.router.navigate(['/home'])
  }

}


