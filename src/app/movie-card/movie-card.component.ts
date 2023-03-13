import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';
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

  /**
   * Fetch movies via API and set movies state to returned data
   * @returns an array of movie objects
   * @function getMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    })
  }

  /**
   * Fetch user data via API and set favourite movies state to returned data 
   * @returns an array of user's favorite movie IDs
   * @function getFavMovies
   */
  getFavMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favMovies = resp.FavoriteMovies;
      console.log(this.favMovies)
      return this.favMovies;
    })
  }

  /**
   * Adds the movie to user's favourites or remove one if it is in the favorites list 
   * and update favourite movies state
   * @param {string} movieId 
   * @returns updates user object
   * @function toggleFavMovie
   */
  toggleFavMovie(movieId: string): void {
    if (!this.favMovies.includes(movieId)) {
      // Adds a movie to favorite
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
      // Removes a movie from favorite
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

  /**
   * Opens genre dialog
   * @param Name 
   * @param Description 
   * @function openGenreDialog
   */
  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name, Description
      }
    });
  }

  /**
   * Opens director dialog
   * @param Name 
   * @param Bio 
   * @param Birth 
   * @function openDirectorDialog
   */
  openDirectorDialog(Name: string, Bio: string, Birth: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name, Bio, Birth
      }
    })
  }

  /**
   * Opens movie's synopsis dialog
   * @param Description 
   * @function openSynopsisDialog
   */
  openSynopsisDialog(Description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Description
      }
    })
  }
}
