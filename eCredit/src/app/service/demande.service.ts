import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { DemandeCredit } from '../interfaces/DemandeCredit';
import { DemandeCreditRequest } from '../interfaces/DemandeCreditRequest';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  private apiUrl = '/api/v1';

  public DemandeData!: DemandeCreditRequest;

  constructor(private http:HttpClient) {

   this.InitiliazeDemandeData();

   }

   InitiliazeDemandeData(){
    this.DemandeData = {
      numDemande:0,
      ncin: 0, // Initialize with default values or appropriate values
      ncompte: 0,
      type: 0,
      montant: 0,
      unite: 0,
      nbreEcheance: 0,
      observation: "",
      taux:0,
      garantieRequests: [],
    };
   }

   download(nDmeande: number,version:number): void {
    this.http
      .get(`${this.apiUrl}/demandeCredit/rapport/${nDmeande}/${version}`, {
        responseType: 'blob', // Set the response type to blob to handle binary data
        observe: 'response', // Get the full HTTP response including headers
      })
      .subscribe((response: HttpResponse<any>) => {
        const contentDispositionHeader = response.headers.get('Content-Disposition');
        const matches = contentDispositionHeader
          ? contentDispositionHeader.match(/filename="?([^"]+)"?/i)
          : null;
        const filename = matches && matches.length > 1 ? matches[1] : 'downloaded_file';
  
        const contentType = response.headers.get('Content-Type') || undefined;
  
        // Create a blob URL to open the file in a new tab
        const blob = new Blob([response.body], { type: contentType });
        const blobUrl = window.URL.createObjectURL(blob);
  
        // Create an anchor element and trigger a click event to open the file
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        a.click();
  
        // Clean up the blob URL
        window.URL.revokeObjectURL(blobUrl);
      });
  }


  
   saveDemandeCredit(data: DemandeCreditRequest): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<any>(`${this.apiUrl}/demandeCredit`, data, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
    }

  getDemandeById(id:number){
    return this.http.get(`${this.apiUrl}/demandeCredit/${id}`).pipe(
      map((response: any) => {
        this.DemandeData = {
          numDemande: response.numDemande,
          ncin: response.idUser,
          type: response.typeCredit,
          unite: response.unite,
          montant: response.montant,
          nbreEcheance: response.nbrEchance,
          ncompte: response.idcompte,
          observation: response.observation,
          garantieRequests: response.garantieRequests
        };
        return response;
      })
    );
    
  }


  
  getDemandeCredits():Observable<DemandeCredit[]>{
    return this.http.get<DemandeCredit[]>(`${this.apiUrl}/demandeCredit`)
      .pipe(map((res:DemandeCredit[])=> res),
      tap(_=>console.log('fetched demands')),
      catchError(this.handleError<DemandeCredit[]>('getDemandeCredits',[]))
      );
  }

  updateDemandeCredit(demandeCredit: DemandeCredit, id: number): Observable<DemandeCredit> {
    return this.http.put<DemandeCredit>(`${this.apiUrl}/demandeCredit/${id}`, demandeCredit)
      .pipe(
        catchError(this.handleError<DemandeCredit>('updateDemandeCredit', {} as DemandeCredit))
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
