import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Compte } from 'src/app/interfaces/Compte';
import { Utilisateur } from 'src/app/interfaces/Utilisateur';
import { CompteService } from 'src/app/service/compte.service';
import { UserService } from 'src/app/service/user.service';


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

  user!:Utilisateur;
  comptes!: any[];
  compte!:Compte;

  constructor( private router: Router , private userService : UserService, private compteService : CompteService) { }

  ngOnInit() { 
   
  }

  setCompteNumber(event : any) {
    if (event.value) {
      this.ncompte = event.value; 
    }
  }

  getUserById(id:number){
    this.userService.getUserById(id).subscribe(
      (response:any)=>{
        this.user=response;
      }
    )
  }

  getCompteById(id:number){
    this.compteService.getCompteById(id).subscribe(
      (response:any)=>{
        this.compte=response;
      }
    )
  }
  
  getAllComptes(){
    this.compteService.getComptes().subscribe(
      (response:Compte[])=>{
        this.comptes=response;
      }
    )
  }

  nextPage() {
    this.router.navigate(['main/client/dossier']);
  }

}

