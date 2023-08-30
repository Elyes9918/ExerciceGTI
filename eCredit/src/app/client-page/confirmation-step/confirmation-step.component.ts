import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-step',
  templateUrl: './confirmation-step.component.html',
  styleUrls: ['./confirmation-step.component.scss']
})
export class ConfirmationStepComponent implements OnInit {

  cardName!:String;
  cardNumber!:String;


  constructor( private router: Router) { }

  ngOnInit() { 
  }


  prevPage() {
      this.router.navigate(['main/client/observation']);
  }
}

