import { Component, OnInit, Input, Inject } from '@angular/core';
// To close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// To bring in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// Used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {
  @Input() userData = { Username: this.data.Username, Password: '', Email: this.data.Email, Birthday: this.data.Birthday };

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { Username: string, Email: string, Birthday: any },
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  // Called once the component has received all its inputs from the real-life user
  ngOnInit(): void { }

  // function to send the inputs to the backend
  editUserInfo(): void {
    this.fetchApiData.editUser(this.userData).subscribe({
      next: (result) => {
        console.log(result);
        localStorage.setItem('user', result.Username);
        this.dialogRef.close(); // Close the modal on success
        this.snackBar.open('Profile updated successfully!', 'OK', { duration: 2000 });
        window.location.reload();
      },
      error: (error) => {
        console.log(error);
        this.snackBar.open(error, 'OK', { duration: 2000 })
      },
      // complete: () => console.log('complete')
    })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
