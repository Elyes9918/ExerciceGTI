import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents-step',
  templateUrl: './documents-step.component.html',
  styleUrls: ['./documents-step.component.scss']
})
export class DocumentsStepComponent implements OnInit {

  cardName!:String;
  cardNumber!:String;


  constructor( private router: Router) { }

  ngOnInit() { 
  }

  nextPage() {
    this.router.navigate(['main/client/observation']);
  }

  prevPage() {
      this.router.navigate(['main/client/garantie']);
  }
}

