import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.css'],
  imports: [FormsModule, NgIf],
  standalone: true,
})
export class RatingDialogComponent {
  newRating: number;
  showErrorMessage: boolean = false;
  originalRating: number;

  constructor(public dialogRef: MatDialogRef<RatingDialogComponent>) {}

  onRatingUpdate(): void {
    this.originalRating = this.newRating;
    const newRatingValue = this.newRating;

    this.dialogRef.close(newRatingValue);
    this.showErrorMessage = false;
  }

  limitToTen(value: number) {
    if (value > 10) {
      this.newRating = this.originalRating;
      this.showErrorMessage = true;
    } else {
      this.showErrorMessage = false;
      this.newRating = value;
    }
  }
}
