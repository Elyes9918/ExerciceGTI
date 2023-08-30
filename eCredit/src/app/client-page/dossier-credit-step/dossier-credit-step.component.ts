import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dossier-credit-step',
  templateUrl: './dossier-credit-step.component.html',
  styleUrls: ['./dossier-credit-step.component.scss']
})
export class DossierCreditStepComponent implements OnInit {

  cardName!:String;
  cardNumber!:String;


  constructor( private router: Router) { }

  ngOnInit() { 
  }

  nextPage() {
    this.router.navigate(['main/client/garantie']);
  }

  prevPage() {
      this.router.navigate(['main/client/info']);
  }
}


