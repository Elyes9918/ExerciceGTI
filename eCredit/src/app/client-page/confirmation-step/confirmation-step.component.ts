import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DemandeService } from 'src/app/service/demande.service';

@Component({
  selector: 'app-confirmation-step',
  templateUrl: './confirmation-step.component.html',
  styleUrls: ['./confirmation-step.component.scss']
})
export class ConfirmationStepComponent implements OnInit {

  formSent:boolean=false;
  items: MenuItem[] = [];


  constructor( private router: Router,private DemandeCreditService:DemandeService,private messageService:MessageService) { }

  ngOnInit() { 
    this.items = [
      { label: 'Version Français',
       icon: 'pi pi-fw pi-file-pdf' ,
        command: () => {
        this. downloadVersionFr();}},
      { separator: true },
      { label: 'Version Anglais',
       icon: 'pi pi-fw pi-file-pdf',
       command: () => {
        this.downloadVersionEn();} }
    ];
  }

  downloadVersionFr(){
    console.log("FR")
    this.DemandeCreditService.download(this.DemandeCreditService?.DemandeData?.numDemande || -1,1)
  }

  downloadVersionEn(){
    console.log("US")
    this.DemandeCreditService.download(this.DemandeCreditService?.DemandeData?.numDemande || -1,2)
  }

  submit(){
    this.DemandeCreditService.saveDemandeCredit(this.DemandeCreditService?.DemandeData).subscribe(
      (response:any)=>{
        console.log(response);
        this.DemandeCreditService.DemandeData.numDemande=response.ndemande;
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

