import { Component, OnInit } from '@angular/core';
import {StepsModule} from 'primeng/steps';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit {

  items!: MenuItem[];

  activeIndex: number = 0;

  ngOnInit() {
    this.items = [
      {
        label: 'Information client',
        routerLink: 'info',
      },
      {
        label: 'Dossier crédit',
        routerLink: 'dossier',
      },
      {
        label: 'Garantie proposées',
        routerLink: 'garantie',
      },
      {
        label: 'Pièces jointes',
        routerLink: 'documents',
      },
      {
        label: 'Observation',
        routerLink: 'observation',
      },
      {
        label: 'Confirmation',
        routerLink: 'confirmation',
      },
    ];
  }



}

