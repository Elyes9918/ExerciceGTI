import { HttpClient, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FichierService {

  
  private apiUrl = '/api/v1';

  constructor(private http:HttpClient) { }
  
  download(uuid: string): void {
    this.http
      .get(`${this.apiUrl}/fichier/${uuid}`, {
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
  



  upload(file: File,idUser:string,nature:string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('idUser',idUser);
    formData.append('nature',nature);


    const req = new HttpRequest('POST', `${this.apiUrl}/fichier`, formData, {
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(idDemande:String): Observable<any> {
    return this.http.get(`${this.apiUrl}/fichiers/${idDemande}`);
  }




  



  

}
