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

  comptes!: any[];

  ncompteVal!:String;



  constructor( private router: Router) { }

  ngOnInit() { 
    this.comptes = [
      {name: '13232', id: '1'},
      {name: '21672', id: '2'},
      {name: '42844', id: '3'}
  ];    
  }

  setCompteNumber(event : any) {
    if (event.value) {
      this.ncompteVal = event.value; 
    }
    console.log(this.ncompteVal)
  }

  nextPage() {
    this.router.navigate(['main/client/garantie']);
  }

  prevPage() {
      this.router.navigate(['main/client/info']);
  }
}


