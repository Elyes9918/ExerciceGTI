import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-garanties-porpose-step',
  templateUrl: './garanties-porpose-step.component.html',
  styleUrls: ['./garanties-porpose-step.component.scss']
})
export class GarantiesPorposeStepComponent implements OnInit {

  cardName!:String;
  cardNumber!:String;


  constructor( private router: Router) { }

  ngOnInit() { 
  }

  nextPage() {
    this.router.navigate(['main/client/documents']);
  }

  prevPage() {
      this.router.navigate(['main/client/dossier']);
  }
}

