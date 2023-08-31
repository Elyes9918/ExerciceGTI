import { Component, OnInit, ViewChild,ElementRef, Injectable } from '@angular/core';
import { Customer, Representative } from 'src/app/api/customer';

import { ConfirmationService, MessageService } from 'primeng/api';
import { DemandeService } from '../service/demande.service';
import { DemandeCredit } from '../interfaces/DemandeCredit';
import { GlobalVariables } from '../globalVariable';


interface expandedRows {
  [key: string]: boolean;
}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  providers: [MessageService, ConfirmationService]
  
})
export class AdminPageComponent implements OnInit{
    

    loading: boolean = false;

    demandeCredits: DemandeCredit[]=[];
    demandeCredit!:DemandeCredit;

    constructor(private demandeService:DemandeService){

    }

    ngOnInit()  {
      this.getAllDemandeCredits();
    }


    getAllDemandeCredits(){
      this.demandeService.getDemandeCredits().subscribe(
        (response:DemandeCredit[])=>{
          this.demandeCredits=response;
        }
      )
    }

    getTypeCreditLabel(value: number): string {
      const typeCredit = GlobalVariables.typeCredit.find(item => item.value === value);
      return typeCredit ? typeCredit.label : 'Unknown Type';
    }

    getStatusLabel(isValidated: number): string {
      return isValidated === 1 ? 'Validé' : (isValidated === 0 ? 'En cours' : 'Refusé')
    }

    Verify(demandeCredit:DemandeCredit){
      demandeCredit.etat=1
      this.demandeService.updateDemandeCredit(demandeCredit,demandeCredit.numDemande);
    }

    Denied(demandeCredit:DemandeCredit){
      demandeCredit.etat=2;
      this.demandeService.updateDemandeCredit(demandeCredit,demandeCredit.numDemande);
    }

    ViewPDF(){

    }
    
  

}
