import { Injectable } from '@angular/core';
import { Anime } from './anime.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  animes: Anime[] = [];

  constructor() {}

  getAllAnimes() {
    return this.animes;
  }

  addAnimes(anime: Anime) {
    this.animes.push(anime);
  }

  deleteAnime(index: number) {
    this.animes.splice(index, 1);
  }
}
