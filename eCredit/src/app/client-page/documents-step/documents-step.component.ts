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

  CreditPersonnel: {label:string,obligation:boolean}[] = [
    {label:"CIN",obligation:true},
    {label:"Bulletin de paie",obligation:true}
  ];

  CreditAuto: {label:string,obligation:boolean}[] =[
    {label:"CIN",obligation:true},
    {label:"Permis",obligation:false},
    {label:"Bulletin de paie",obligation:true}
  ];

  CreditTravaux: {label:string,obligation:boolean}[] =[
    {label:"CIN",obligation:true},
    {label:"Copie de patente",obligation:true}
  ];

  typesDocuments: { label: string; value: string }[] = [
    { label: 'CIN', value: "1" },
    { label: 'Permis', value: "2"},
    { label: 'Copie de patente', value: "3" },
    { label: 'Bulletin de paie', value: "4" },
  ];

  tableToItereate:any[]=[];
  fileUploadStatus: boolean[] = [];
  fileUploadDisabled: boolean[] = Array(this.tableToItereate.length).fill(false);

  uploadedFiles: any[] = [];
  fichiers!: any[];

  validationFlag:boolean=false;

  typeCredit:number=this.DemandeCreditService?.DemandeData?.type;

  constructor( private router: Router,private fichierService:FichierService,private DemandeCreditService:DemandeService) { }

  ngOnInit() { 
    this.getAllFichiersByIdUser(this.DemandeCreditService?.DemandeData?.ncin.toString());
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
      this.checkIfDocumentsExists(item.label, i);
    });

  }

  checkIfDocumentsExists(natureDocument:string,i:number):void{
    const document = this.typesDocuments.find(item => item.label === natureDocument);
    const nature = document?.value || '';

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


  areAllRequiredDocsUploaded(table: { label: string; obligation: boolean }[], fileUploadStatus: boolean[]): boolean {
    for (let i = 0; i < table.length; i++) {
      const doc = table[i];
      // Check if the document is required 
      if (doc.obligation) {
        // Check if the corresponding file is uploaded
        if (!fileUploadStatus[i]) {
          return false;
        }
      }
    }
    return true;
  }
  

  onUploadBP(event: any,natureDocument:string,i:number) {

    const document = this.typesDocuments.find(item => item.label === natureDocument);
    const nature = document?.value || '';
    console.log(nature);

    for (const file of event.files) {
      this.fichierService.upload(file,this.DemandeCreditService?.DemandeData?.ncin.toString(),nature).subscribe(
      (event: any) => {
        this.fileUploadStatus[i] = true;
        if (event instanceof HttpResponse) {
          console.log(event.body.message)

        }
      },
      (err: any) => {
      });
    }
  }

  download(nomDocument:string):void{
    const document = this.typesDocuments.find(item => item.label === nomDocument);
    const nature = document?.value || '';
    const uuid = this.fichiers.find(item=>item.nature.toString()===nature)  .uuid;
    this.fichierService.download(uuid);

  }

 
  nextPage() {
    // I need to check that all documents which have obligation true have also status uploaded true
    if(this.areAllRequiredDocsUploaded(this.tableToItereate,this.fileUploadStatus)){
      this.router.navigate(['main/client/observation']);
    }else{
      this.validationFlag=true;
    }
    
  }

  prevPage() {
      this.router.navigate(['main/client/garantie']);
  }
}

