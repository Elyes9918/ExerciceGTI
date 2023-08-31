import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ApiResponse } from '../interfaces/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthenticiationService {

  SESSION_KEY='ncin'

  private apiUrl = '/api/v1';

  constructor(private http:HttpClient) { }

  authenticate(ncin: number, password: string): Observable<ApiResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = { ncin, password };

    return this.http.post<ApiResponse>(`${this.apiUrl}/validateLogin`, body, { headers, responseType: 'json' }).pipe(
      tap(response => {
        if (response.success) {
          sessionStorage.setItem(this.SESSION_KEY, ncin.toString());
        }
      }),
      catchError(error => {
        console.error('Authentication error:', error);
        return throwError('Authentication failed');
      })
    );
  }

  isUserLoggedin(){
    let user = sessionStorage.getItem('ncin');
    return !(user===null);
  }

  logout(){
    sessionStorage.removeItem('ncin');
  }

  getLoggedinUser(){
    let user = sessionStorage.getItem(this.SESSION_KEY);
    return user;
  }


}
