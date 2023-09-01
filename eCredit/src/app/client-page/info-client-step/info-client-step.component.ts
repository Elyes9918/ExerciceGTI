import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariables } from 'src/app/globalVariable';
import { Compte } from 'src/app/interfaces/Compte';
import { Utilisateur } from 'src/app/interfaces/Utilisateur';
import { AuthenticiationService } from 'src/app/service/authenticiation.service';
import { CompteService } from 'src/app/service/compte.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-info-client-step',
  templateUrl: './info-client-step.component.html',
  styleUrls: ['./info-client-step.component.scss']
})
export class InfoClientStepComponent implements OnInit {

  ncin!:number;
  nom!:String;
  prenom!:String;
  ncompte!:String;
  dateouv!:Date;
  datenaiss!:Date;
  sfamiliale!:String;
  devise!: string;

  user!:Utilisateur;
  comptes!: any[];
  compte!:Compte;

  constructor( private router: Router , private userService : UserService, private compteService : CompteService,private authService:AuthenticiationService) { }

  ngOnInit() { 
    const userId = this.authService.getLoggedinUser();
    if (userId !== null) {
      this.getUserById(+userId);
      this.getAllComptesByIdUser(+userId)
      
    }   
  }

  setCompteNumber(event : any) {
    if (event.value) {
      this.ncompte = event.value.ncompte; 
      this.getCompteById(+this.ncompte);
    }
  }

  getUserById(id:number){
    this.userService.getUserById(id).subscribe(
      (response:any)=>{
        this.user=response;
        this.ncin = this.user.ncin;
        this.nom=this.user.nom;
        this.prenom=this.user.prenom;
        this.datenaiss = new Date(this.user.dateNaissance);
        this.user.situationF==="c" ? this.sfamiliale="Célibataire" : this.sfamiliale="Marié";
      }
    )
  }

  getCompteById(id:number){
    this.compteService.getCompteById(id).subscribe(
      (response:any)=>{
        this.compte=response;
        const matchingDevise = GlobalVariables.devise.find(item => item.value === this.compte.devise);
        this.devise = matchingDevise ? matchingDevise.label : 'Devise Not found';
        this.dateouv = new Date(this.compte.dateOuveurture);
      }
    )
  }
  
  getAllComptesByIdUser(id:number){
    this.compteService.getComptes(id).subscribe(
      (response:Compte[])=>{
        this.comptes=response;

        if (this.comptes && this.comptes.length > 0) {
          const firstCompteId = this.comptes[0].ncompte;
          this.getCompteById(firstCompteId);
        }
        console.log(this.comptes)

      }
    )
  }

  nextPage() {
    this.router.navigate(['main/client/dossier']);
  }

}

