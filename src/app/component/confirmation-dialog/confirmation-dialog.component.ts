import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close class="cancel-button">Cancel</button>
      <button mat-button [mat-dialog-close]="true" class="confirm-button">Confirm</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .cancel-button {
      background-color: white;
      border-color: #0F7490;
      color: #0F7490;
      margin-left:5px;
    }

    .confirm-button {
      margin-right: 10px;
      background-color: #0F7490;
      border-color: #0F7490;
      color: white;
    }
  `]
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}
}
