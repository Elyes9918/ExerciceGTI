import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DemandeService } from 'src/app/service/demande.service';

@Component({
  selector: 'app-confirmation-step',
  templateUrl: './confirmation-step.component.html',
  styleUrls: ['./confirmation-step.component.scss']
})
export class ConfirmationStepComponent implements OnInit {

  cardName!:String;
  cardNumber!:String;


  constructor( private router: Router,private DemandeCreditService:DemandeService) { }

  ngOnInit() { 
  }

  submit(){
    this.DemandeCreditService.saveDemandeCredit(this.DemandeCreditService?.DemandeData).subscribe(
      (response:any)=>{
        console.log(response)
      },
      (error)=>{
        console.log(error);
      }
    )
  }


  prevPage() {
      this.router.navigate(['main/client/observation']);
  }
}

