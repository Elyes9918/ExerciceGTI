import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariables } from 'src/app/globalVariable';

@Component({
  selector: 'app-dossier-credit-step',
  templateUrl: './dossier-credit-step.component.html',
  styleUrls: ['./dossier-credit-step.component.scss']
})
export class DossierCreditStepComponent implements OnInit {

  typeCredit!: any[];
  filteredTypeCredit: any[] = [];

  unites!: any[];
  filteredUnites: any[] = [];

  credit!:String;
  montant!:String;
  unite!:String;
  nbecheance!:String;

  constructor( private router: Router) { }

  ngOnInit() { 
    this.typeCredit = GlobalVariables.typeCredit;
    this.unites = GlobalVariables.unites;

  }

  setCreditType(event : any) {
    if (event.value) {
      this.credit = event.value; 
    }
  }

  setUnite(event : any) {
    if (event.value) {
      this.unite = event.value; 
    }
  }

  filterTypeCredit(event: any) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.typeCredit.length; i++) {
        const typecredit = this.typeCredit[i];
        if (typecredit.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(typecredit);
        }
    }
    this.filteredTypeCredit = filtered;
  }

  filterUnite(event: any) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.unites.length; i++) {
        const unite = this.unites[i];
        if (unite.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(unite);
        }
    }
    this.filteredUnites = filtered;
  }

  nextPage() {
    this.router.navigate(['main/client/garantie']);
  }

  prevPage() {
      this.router.navigate(['main/client/info']);
  }
}


