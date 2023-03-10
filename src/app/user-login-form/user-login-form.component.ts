import { Component, OnInit, Input } from '@angular/core';
// To close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// To bring in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// Used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' }

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (result) => {
        console.log(result);
        localStorage.setItem('user', result.user.Username);
        localStorage.setItem('token', result.token);
        this.dialogRef.close(); // Close the modal on success
        this.snackBar.open(`Welcome Back ${this.userData.Username}`, 'OK', { duration: 2000 });
      },
      error: (error) => {
        console.log(error);
        this.snackBar.open(error, 'OK', { duration: 2000 })
      },
      // complete: () => console.log('complete')
    })
  }
}
