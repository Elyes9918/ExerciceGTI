import { Component, OnInit, ViewChild,ElementRef, Injectable } from '@angular/core';
import { Customer, Representative } from 'src/app/api/customer';

import { ConfirmationService, MessageService } from 'primeng/api';
import { DemandeService } from '../service/demande.service';
import { DemandeCredit } from '../interfaces/DemandeCredit';
import { GlobalVariables } from '../globalVariable';
import { Router } from '@angular/router';
import { AuthenticiationService } from '../service/authenticiation.service';


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

    constructor(private demandeService:DemandeService,private router:Router){

    }

    ngOnInit()  {
      this.getAllDemandeCredits();
    }

    consulterDemande(id:number){
      this.router.navigate(['main/client/info',id])
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
      this.demandeService.updateDemandeCredit(demandeCredit, demandeCredit.numDemande).subscribe(
        (updatedDemandeCredit: DemandeCredit) => {
          console.log('Updated demandeCredit:', updatedDemandeCredit);
        },
        (error) => {
          console.error('Error updating demandeCredit:', error);
        }
      );
    }

    Denied(demandeCredit:DemandeCredit){
      demandeCredit.etat=2;
      this.demandeService.updateDemandeCredit(demandeCredit,demandeCredit.numDemande).subscribe(
        (updatedDemandeCredit: DemandeCredit) => {
          console.log('Updated demandeCredit:', updatedDemandeCredit);
        },
        (error) => {
          console.error('Error updating demandeCredit:', error);
        }
      );
    }

    ViewPDF(){

    }
    
}
