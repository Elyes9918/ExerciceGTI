import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { DemandeCredit } from '../interfaces/DemandeCredit';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  private apiUrl = '/api/v1';

  constructor(private http:HttpClient) { }


  getDemandeCredits():Observable<DemandeCredit[]>{
    return this.http.get<DemandeCredit[]>(`${this.apiUrl}/demandeCredit`)
      .pipe(map((res:DemandeCredit[])=> res),
      tap(_=>console.log('fetched demands')),
      catchError(this.handleError<DemandeCredit[]>('getDemandeCredits',[]))
      );
  }

  updateDemandeCredit(demandeCredit: DemandeCredit, id: number) {
    return this.http.put(`${this.apiUrl}/demandeCredit/${id}`, demandeCredit)
    .pipe(catchError(this.handleError<any>()));
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
