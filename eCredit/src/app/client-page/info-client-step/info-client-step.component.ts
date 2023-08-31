import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-info-client-step',
  templateUrl: './info-client-step.component.html',
  styleUrls: ['./info-client-step.component.scss']
})
export class InfoClientStepComponent implements OnInit {

  cardName!:String;
  cardNumber!:String;

  comptes!: any[];

  ncompteVal!:String;
  EnDevise!:Boolean;




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
    this.router.navigate(['main/client/dossier']);
  }

}

