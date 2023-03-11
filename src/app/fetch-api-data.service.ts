import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflix-by-mikkobelly.herokuapp.com';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  // API call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(`${apiUrl}/users`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // API call for the user login endpoint
  userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(`${apiUrl}/login`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // API call for getting all movies endpoints
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/movies`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // API call for getting a single movie
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/movies/${title}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // API call for getting director info
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/movies/director/${directorName}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // API call for getting genre description
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/movies/genre/${genreName}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // API call for getting user's data
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.get(`${apiUrl}/users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // API call for getting user's favorite movies
  getFavMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.get(`${apiUrl}/users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token
        }
      )
    }).pipe(
      map(this.extractResponseData),
      map(data => data.FavoriteMovies),
      catchError(this.handleError)
    )
  }

  // API call for adding a movie to user's favorite movies
  addFaveMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.post(`${apiUrl}/users/${username}/movies/${movieId}`, {
      favoriteMovie: movieId
    }, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token
        }
      )
    }).pipe(
      catchError(this.handleError)
    )
  }

  // API call for deleting a movie from user's favorite movies
  deleteFavMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(`${apiUrl}/users/${username}/movies/${movieId}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token
        }
      )
    }).pipe(
      catchError(this.handleError)
    )
  }

  // API call for editting user info
  editUser(updatedUserDetails: any): Observable<any> {
    console.log(updatedUserDetails);
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(`${apiUrl}/users/${username}`, updatedUserDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // API call for deregistering user
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(`${apiUrl}/users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}

