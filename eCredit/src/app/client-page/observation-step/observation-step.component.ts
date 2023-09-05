import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DemandeService } from 'src/app/service/demande.service';

@Component({
  selector: 'app-observation-step',
  templateUrl: './observation-step.component.html',
  styleUrls: ['./observation-step.component.scss']
})
export class ObservationStepComponent implements OnInit {

  observation:string="";

  consultationFlag:boolean=false;

  constructor( private router: Router,
    private DemandeCreditService:DemandeService,
    private route:ActivatedRoute
    ) { }

  ngOnInit() { 

    this.route.params.subscribe(
      (params:Params)=>{        
        if(params['id']!=null){
          this.consultationFlag=true;
          this.getDemandeById(params['id']);
        }
      }
    )

    if(this.DemandeCreditService.DemandeData.observation!=""){
      this.observation=this.DemandeCreditService.DemandeData.observation;
    }

  }

  getDemandeById(id:number){
    this.DemandeCreditService.getDemandeById(id).subscribe(
      (response:any)=>{
        this.observation=this.DemandeCreditService.DemandeData.observation;
      }
    )
  }

  backToAdmin(){
    this.router.navigate(['main/admin']);
    this.DemandeCreditService.InitiliazeDemandeData();
  }

  nextPage() {

    this.router.navigate(['main/client/confirmation']);
    this.DemandeCreditService.DemandeData.observation=this.observation;

  }

  prevPage() {
    this.consultationFlag ?
     this.router.navigate(['main/client/documents',this.DemandeCreditService.DemandeData.numDemande]) :
     this.router.navigate(['main/client/documents']);
  }
}

