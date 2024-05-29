import { Component } from '@angular/core';
import { Anime } from '../../services/anime.model';
import { NgFor, NgIf } from '@angular/common';
import { Data } from '@angular/router';
import { DataService } from '../../services/data.service';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { OmdbService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AnimeDialogComponent } from '../../anime-dialog/anime-dialog.component';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-animelist',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, HttpClientModule],
  templateUrl: './animelist.component.html',
  styleUrl: './animelist.component.css',
})
export class AnimelistComponent {
  animes: Anime[];
  showValidationsError: boolean;

  animeFormControl = new FormControl();
  animeSuggestions: string[] = [];

  constructor(
    private dataservice: DataService,
    private omdbService: OmdbService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.animes = this.dataservice.getAllAnimes();
  }

  onFormSubmit(Form: NgForm) {
    if (!Form.valid) return (this.showValidationsError = true);

    const title = Form.value.text.trim();
    this.omdbService.getMovieDetails(title).subscribe(
      (movieDetails) => {
        const rating = movieDetails.imdbRating;
        const plot = movieDetails.Plot;
        const posterUrl = movieDetails.Poster;
        const anime = new Anime(title, movieDetails, posterUrl, rating, plot);
        console.log(movieDetails);
        this.dataservice.addAnimes(anime);
        this.showValidationsError = false;
        Form.reset();
      },
      (error) => {
        console.error('Error fetching movie details:', error);
      }
    );
  }

  onDeleteClicked(anime: Anime) {
    const index = this.animes.indexOf(anime);
    this.dataservice.deleteAnime(index);
  }

  openDialog(anime: Anime): void {
    this.dialog.open(AnimeDialogComponent, {
      width: '400px',
      data: anime,
    });
  }
}
