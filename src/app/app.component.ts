import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor(public dialog: MatDialog) { }

  // Open the signup dialog
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, { width: '300px' });
  }

  // Open the login dialog
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, { width: '300px' });
  }
}
