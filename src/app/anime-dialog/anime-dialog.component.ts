import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Anime } from '../services/anime.model';
import { RatingDialogComponent } from '../rating-dialog/rating-dialog.component';

@Component({
  selector: 'app-anime-dialog',
  templateUrl: './anime-dialog.component.html',
  styleUrls: ['./anime-dialog.component.css'],
})
export class AnimeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AnimeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public anime: Anime,
    public dialog: MatDialog
  ) {}

  openRatingDialog(): void {
    const dialogRef = this.dialog.open(RatingDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((newRating: number) => {
      if (newRating !== undefined) {
        this.anime.rating = newRating;
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
