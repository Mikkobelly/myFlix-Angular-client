import { Component, OnInit, Input } from '@angular/core';
// To close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// To bring in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// Used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  // Called once the component has received all its inputs from the real-life user
  ngOnInit(): void { }

  // function to send the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (result) => {
        console.log(result);
        this.dialogRef.close(); // Close the modal on success
        this.snackBar.open('User registered successfully!', 'OK', { duration: 2000 });
      },
      error: (error) => {
        console.log(error);
        this.snackBar.open(error, 'OK', { duration: 2000 })
      },
      // complete: () => console.log('complete')
    })
  }
}