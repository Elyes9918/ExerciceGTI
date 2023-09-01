import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FichierService } from '../../service/fichier.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-documents-step',
  templateUrl: './documents-step.component.html',
  styleUrls: ['./documents-step.component.scss']
})
export class DocumentsStepComponent implements OnInit {

  CreditPersonnel: string[] = ["CIN", "Bulletin de paie"];
  CreditAuto: string[] = ["CIN", "Permis", "Bulletin de paie"];
  CreditTravaux: string[] = ["CIN", "Copie de patente"];

  typesDocuments: { label: string; value: string }[] = [
    { label: 'CIN', value: "1" },
    { label: 'Permis', value: "2" },
    { label: 'Copie de patente', value: "3" },
    { label: 'Bulletin de paie', value: "3" },
  ];

  tableToItereate:any[]=[];
  fileUploadStatus: boolean[] = [];

  uploadedFiles: any[] = [];

  bulletainPaieStatus:boolean = false;
  cinStatus:boolean = false;

  typeCrédit:number=3;



  constructor( private router: Router,private fichierService:FichierService) { }

  ngOnInit() { 

    if(this.typeCrédit===1){
      this.tableToItereate=this.CreditPersonnel;
    }else if(this.typeCrédit===2){
      this.tableToItereate=this.CreditAuto;
    }else{
      this.tableToItereate=this.CreditTravaux;
    }
    
  }

  onUploadBP(event: any,natureDocument:string,i:number) {

    const document = this.typesDocuments.find(item => item.label === natureDocument);
    const nature = document?.value || '';
    const idUser = sessionStorage.getItem('ncin') || '';

    for (const file of event.files) {
      this.fichierService.upload(file,idUser,nature).subscribe(
      (event: any) => {
        this.fileUploadStatus[i] = true;
        if (event instanceof HttpResponse) {
          console.log(event.body.message)
          
        }
      },
      (err: any) => {
      });
    }
    this.bulletainPaieStatus=true;
  }
 
  nextPage() {
    this.router.navigate(['main/client/observation']);
  }

  prevPage() {
      this.router.navigate(['main/client/garantie']);
  }
}

