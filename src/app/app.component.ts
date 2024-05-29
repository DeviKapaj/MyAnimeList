import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimelistComponent } from './animelist/animelist/animelist.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, AnimelistComponent, HttpClientModule],
})
export class AppComponent {
  title = 'AngularCrud-app';
}
