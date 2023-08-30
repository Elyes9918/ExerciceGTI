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


  constructor( private router: Router) { }

  ngOnInit() { 
  }

  nextPage() {
    this.router.navigate(['main/client/dossier']);
  }

}

