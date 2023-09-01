import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FichierService {

  
  private apiUrl = '/api/v1';

  constructor(private http:HttpClient) { }


  upload(file: File,idDemande:string,nature:string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('idDemande',idDemande);
    formData.append('nature',nature);


    const req = new HttpRequest('POST', `${this.apiUrl}/fichier`, formData, {
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(idDemande:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/fichiers/${idDemande}`);
  }




  



  

}
