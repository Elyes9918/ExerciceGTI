import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GlobalVariables } from 'src/app/globalVariable';
import { Compte } from 'src/app/interfaces/Compte';
import { Utilisateur } from 'src/app/interfaces/Utilisateur';
import { AuthenticiationService } from 'src/app/service/authenticiation.service';
import { CompteService } from 'src/app/service/compte.service';
import { DemandeService } from 'src/app/service/demande.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-info-client-step',
  templateUrl: './info-client-step.component.html',
  styleUrls: ['./info-client-step.component.scss']
})
export class InfoClientStepComponent implements OnInit {

  ncin:number=0;
  nom!:string;
  prenom!:string;
  ncompte!:string;
  dateouv!:Date;
  datenaiss!:Date;
  sfamiliale!:string;
  devise!: string;

  user!:Utilisateur;
  comptes!: any[];
  compte!:Compte;

  disableNcinField:boolean=false;
  ncinField8digitsFlag:boolean=false;
  ncinIncorrectFlag:boolean=false;
  backFlag:boolean=false

  consultationFlag:boolean=false;

  constructor( private router: Router ,
     private userService : UserService,
      private compteService : CompteService,
      private DemandeCreditService:DemandeService,
      private route:ActivatedRoute) { }

  ngOnInit() { 

    this.route.params.subscribe(
      (params:Params)=>{        
        if(params['id']!=null){
          this.consultationFlag=true;
          this.getDemandeById(params['id']);
        }
      }
    )

    if(this.DemandeCreditService.DemandeData.ncin!=0 && this.DemandeCreditService.DemandeData.ncompte && !this.consultationFlag){
      this.backFlag=true;
      this.getUserById(this.DemandeCreditService.DemandeData.ncin);
      this.getAllComptesByIdUser(this.DemandeCreditService.DemandeData.ncin)
    }
    
  }

  populateFields(){
    if(this.ncin.toString().length===8){
      this.getUserById(+this.ncin);
      this.getAllComptesByIdUser(+this.ncin)
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
        this.disableNcinField=true;
        this.ncinIncorrectFlag=false;
        this.ncinField8digitsFlag=false;

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
        if(this.backFlag){
          this.getCompteById(this.DemandeCreditService.DemandeData.ncompte);
        }

      }
    )
  }

  getDemandeById(id:number){
    this.DemandeCreditService.getDemandeById(id).subscribe(
      (response:any)=>{
        this.getUserById(response.idUser);
        this.getAllComptesByIdUser(response.idUser)
      }
    )
  }

  backToAdmin(){
    this.router.navigate(['main/admin']);
    this.DemandeCreditService.InitiliazeDemandeData();
  }

  nextPage() {

    if(this.consultationFlag){
      this.router.navigate(['main/client/dossier',this.DemandeCreditService.DemandeData.numDemande])
    }else{
      if(this.nom!=null && this.ncin.toString().length===8){
        this.router.navigate(['main/client/dossier']);
        this.DemandeCreditService.DemandeData.ncin=this.ncin;
        this.DemandeCreditService.DemandeData.ncompte= Number.isNaN(Number(this.ncompte)) ?
        Number(this.comptes[0].ncompte) : Number(this.ncompte);  
      }else{
        this.ncin.toString().length!=8 ? this.ncinField8digitsFlag=true : this.ncinField8digitsFlag=false;
        if(this.nom==null){
          this.ncinIncorrectFlag=true;
        }
      }
    }
  }

}

