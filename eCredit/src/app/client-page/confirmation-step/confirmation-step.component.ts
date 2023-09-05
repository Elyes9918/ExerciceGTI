import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DemandeService } from 'src/app/service/demande.service';

@Component({
  selector: 'app-confirmation-step',
  templateUrl: './confirmation-step.component.html',
  styleUrls: ['./confirmation-step.component.scss']
})
export class ConfirmationStepComponent implements OnInit {

  formSent:boolean=false;

  constructor( private router: Router,private DemandeCreditService:DemandeService,private messageService:MessageService) { }

  ngOnInit() { 
  }

  submit(){
    this.DemandeCreditService.saveDemandeCredit(this.DemandeCreditService?.DemandeData).subscribe(
      (response:any)=>{
        this.messageService.add({
          severity: "success",
          detail: "Demande submited successfully",
        });
        this.formSent=true;
      },
      (error)=>{
        console.log(error);
        this.messageService.add({
          severity: "error",
          detail: "Failed to submit",
        });
      }
    )
  }

  initialiser(){
    this.DemandeCreditService.DemandeData = {
      ncin: 0, // Initialize with default values or appropriate values
      ncompte: 0,
      type: 0,
      montant: 0,
      unite: 0,
      nbreEcheance: 0,
      observation: "",
      garantieRequests: [],
    };
    this.router.navigate(['main/client/info']);
  }

  prevPage() {
      this.router.navigate(['main/client/observation']);
  }
}

