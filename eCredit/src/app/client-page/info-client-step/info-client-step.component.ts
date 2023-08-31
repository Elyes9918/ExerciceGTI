import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-info-client-step',
  templateUrl: './info-client-step.component.html',
  styleUrls: ['./info-client-step.component.scss']
})
export class InfoClientStepComponent implements OnInit {


  ncin!:String;
  nom!:String;
  prenom!:String;
  ncompte!:String;
  dateouv!:String;
  datenaiss!:String;
  sfamiliale!:String;
  devise!:boolean;

  comptes!: any[];

  constructor( private router: Router) { }

  ngOnInit() { 
    this.comptes = [
      {value: '13232'},
      {value: '21672'},
      {value: '42844'}
  ];    
  }

  setCompteNumber(event : any) {
    if (event.value) {
      this.ncompte = event.value; 
    }
  }
  

  nextPage() {
    this.router.navigate(['main/client/dossier']);
  }

}

