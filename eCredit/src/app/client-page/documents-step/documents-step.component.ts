import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FichierService } from '../../service/fichier.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Fichier } from 'src/app/interfaces/Fichier';
import { DemandeService } from 'src/app/service/demande.service';

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
    { label: 'Bulletin de paie', value: "4" },
  ];

  tableToItereate:any[]=[];
  fileUploadStatus: boolean[] = [];
  fileUploadDisabled: boolean[] = Array(this.tableToItereate.length).fill(false);


  uploadedFiles: any[] = [];

  bulletainPaieStatus:boolean = false;
  cinStatus:boolean = false;

  typeCredit:number=this.DemandeCreditService?.DemandeData?.type;

  fichiers!: any[];

  idLoggedInUser=sessionStorage.getItem('ncin') || '';




  constructor( private router: Router,private fichierService:FichierService,private DemandeCreditService:DemandeService) { }

  ngOnInit() { 
    this.getAllFichiersByIdUser(this.idLoggedInUser);
  }

  getAllFichiersByIdUser(id:String){
    this.fichierService.getFiles(id).subscribe(
      (response:Fichier[])=>{
        this.fichiers=response;
        this.determineCreditType();

      }
    )
  }

  determineCreditType(){
    if(this.typeCredit===1){
      this.tableToItereate=this.CreditPersonnel;
    }else if(this.typeCredit===2){
      this.tableToItereate=this.CreditAuto;
    }else{
      this.tableToItereate=this.CreditTravaux;
    }

    this.tableToItereate.forEach((item, i) => {
      this.checkIfDocumentsExists(item, i);
    });

  }

  checkIfDocumentsExists(natureDocument:string,i:number):void{
    const document = this.typesDocuments.find(item => item.label === natureDocument);
    const nature = document?.value || '';
    // const itemExists = this.fichiers.some(fichier => fichier?.nature === nature);

    let itemExists = false;

    for (const fichier of this.fichiers) {
      if (fichier.nature.toString() === nature) {
        itemExists = true;
        break; // Exit the loop as soon as a matching item is found
      }
    }

    this.fileUploadDisabled[i] = itemExists;
    this.fileUploadStatus[i] = itemExists;
  }

  onUploadBP(event: any,natureDocument:string,i:number) {

    const document = this.typesDocuments.find(item => item.label === natureDocument);
    const nature = document?.value || '';

    for (const file of event.files) {
      this.fichierService.upload(file,this.idLoggedInUser,nature).subscribe(
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

  download(nomDocument:string):void{
    const document = this.typesDocuments.find(item => item.label === nomDocument);
    const nature = document?.value || '';
    const uuid = this.fichiers.find(item=>item.nature.toString()===nature)  .uuid;
    this.fichierService.download(uuid);

  }

 
  nextPage() {
    this.router.navigate(['main/client/observation']);
  }

  prevPage() {
      this.router.navigate(['main/client/garantie']);
  }
}

