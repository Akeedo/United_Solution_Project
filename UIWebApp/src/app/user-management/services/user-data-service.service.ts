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

    saveUser(user: any): Observable<any>{
      return this.http.post<any>(this.apiURL +'/users', user);
    }
  }

