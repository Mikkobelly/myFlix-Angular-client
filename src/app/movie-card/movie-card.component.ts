import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favMovies: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    })
  }

  getFavMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favMovies = resp.FavoriteMovies;
      console.log(this.favMovies)
      return this.favMovies;
    })
  }

  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name, Description
      }
    });
  }

  openDirectorDialog(Name: string, Bio: string, Birth: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name, Bio, Birth
      }
    })
  }

  openSynopsisDialog(Description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Description
      }
    })
  }

  toggleFavMovie(movieId: string): void {
    if (!this.favMovies.includes(movieId)) {
      // Add movie to favorite
      this.fetchApiData.addFavMovie(movieId).subscribe({
        next: (resp: any) => {
          console.log(resp);
          this.favMovies = resp.FavoriteMovies;
          this.snackBar.open('Added to favorite!', 'OK', { duration: 2000 });
        },
        error: (error) => {
          console.log(error);
          this.snackBar.open(error, 'OK', { duration: 2000 })
        },
      })
    } else {
      // Remove movie from favorite
      this.fetchApiData.deleteFavMovie(movieId).subscribe({
        next: (resp: any) => {
          console.log(resp);
          this.favMovies = resp.FavoriteMovies;
          this.snackBar.open('Removed from favorite', 'OK', { duration: 2000 });
        },
        error: (error) => {
          console.log(error);
          this.snackBar.open(error, 'OK', { duration: 2000 })
        },
      })
    }
  }
}
