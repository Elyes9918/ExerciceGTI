import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariables } from 'src/app/globalVariable';

@Component({
  selector: 'app-dossier-credit-step',
  templateUrl: './dossier-credit-step.component.html',
  styleUrls: ['./dossier-credit-step.component.scss']
})
export class DossierCreditStepComponent implements OnInit {

  typeCredit!: any[];
  unites!: any[];

  credit!:String;
  montant!:String;
  unite!:String;
  nbecheance!:String;

  constructor( private router: Router) { }

  ngOnInit() { 
    this.typeCredit = GlobalVariables.typeCredit;
    this.unites = GlobalVariables.unites;

  }

  setCreditType(event : any) {
    if (event.value) {
      this.credit = event.value; 
    }
  }

  setUnite(event : any) {
    if (event.value) {
      this.unite = event.value; 
    }
  }

  nextPage() {
    this.router.navigate(['main/client/garantie']);
  }

  prevPage() {
      this.router.navigate(['main/client/info']);
  }
}


