import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-observation-step',
  templateUrl: './observation-step.component.html',
  styleUrls: ['./observation-step.component.scss']
})
export class ObservationStepComponent implements OnInit {

  observation!:String;

  constructor( private router: Router) { }

  ngOnInit() { 
  }

  nextPage() {
    this.router.navigate(['main/client/confirmation']);
  }

  prevPage() {
      this.router.navigate(['main/client/documents']);
  }
}

