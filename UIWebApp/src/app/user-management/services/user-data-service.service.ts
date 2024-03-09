import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {

  constructor(
    private http: HttpClient
  ) { }

  private apiURL: string = 'http://localhost:3000';

    
  saveUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/users', user).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    if (error.status === 401) {
      // handle unauthorized error
      console.log('Unauthorized:', error);
    } else {
      // handle other errors
      console.log('An error occurred:', error);
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
  
  }

