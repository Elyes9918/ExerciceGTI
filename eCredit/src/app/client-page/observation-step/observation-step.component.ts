import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemandeService } from 'src/app/service/demande.service';

@Component({
  selector: 'app-observation-step',
  templateUrl: './observation-step.component.html',
  styleUrls: ['./observation-step.component.scss']
})
export class ObservationStepComponent implements OnInit {

  observation:string="";

  constructor( private router: Router,private DemandeCreditService:DemandeService) { }

  ngOnInit() { 
    if(this.DemandeCreditService.DemandeData.observation!=""){
      this.observation=this.DemandeCreditService.DemandeData.observation;
    }
  }

  nextPage() {
    this.router.navigate(['main/client/confirmation']);
    this.DemandeCreditService.DemandeData.observation=this.observation;
  }

  prevPage() {
      this.router.navigate(['main/client/documents']);
  }
}

