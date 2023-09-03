import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Compte } from '../interfaces/Compte';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  private apiUrl = '/api/v1';

  constructor(private http:HttpClient) { }

  getCompteById(id:number){
    return this.http.get(`${this.apiUrl}/compte/${id}`)
  }

  getComptes(id:number):Observable<Compte[]>{
    return this.http.get<Compte[]>(`${this.apiUrl}/comptes/${id}`)
      .pipe(map((res:Compte[])=> res),
      catchError(this.handleError<Compte[]>('getDemandeCredits',[]))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }





}
