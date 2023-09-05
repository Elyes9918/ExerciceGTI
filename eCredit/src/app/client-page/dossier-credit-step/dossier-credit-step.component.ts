import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GlobalVariables } from 'src/app/globalVariable';
import { DemandeService } from 'src/app/service/demande.service';

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

  credit!:any;
  montant!:String;
  unite!:any;
  nbecheance!:String;

  creditFlag:boolean=false;
  montantFlag:boolean=false;
  uniteFlag:boolean=false;
  nbecheanceFlag:boolean=false;

  consultationFlag:boolean=false;

  maxEcheance:number=144;


  constructor( private router: Router,
    private demandeCreditService:DemandeService,
    private route:ActivatedRoute) { }

  ngOnInit() { 
    this.typeCredit = GlobalVariables.typeCredit;
    this.unites = GlobalVariables.unites;

    this.route.params.subscribe(
      (params:Params)=>{        
        if(params['id']!=null){
          this.consultationFlag=true;
          this.getDemandeById(params['id']);
        }
      }
    )

    if(this.demandeCreditService.DemandeData.type!=0){
      this.getInformationFormCreditService()
    }

  }

  // CalculeNbreEcheance(this.credit.label,this.unite.label);
  CalculeNbreEcheance(labelCredit:string,labelUnite:string){
    if(labelCredit!=null && labelUnite!=null){
      const periodeMax =this.typeCredit.find((item)=>item.label===labelCredit).periodeMax;
      const unite = this.unites.find((item)=>item.label===labelUnite).nbrMois;
      console.log(periodeMax*unite);
      this.nbecheance = (periodeMax*unite).toString();
    }
  }

  getDemandeById(id:number){
    this.demandeCreditService.getDemandeById(id).subscribe(
      (response:any)=>{
        this.getInformationFormCreditService()
      }
    )
  }

  getInformationFormCreditService(){
    this.credit=this.typeCredit.find((item)=>item.value===this.demandeCreditService.DemandeData.type);
    this.montant=this.demandeCreditService.DemandeData.montant.toString();
    this.unite=this.unites.find((item)=>item.value===this.demandeCreditService.DemandeData.unite);
    this.nbecheance=this.demandeCreditService.DemandeData.nbreEcheance.toString();
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

  backToAdmin(){
    this.router.navigate(['main/admin']);
    this.demandeCreditService.InitiliazeDemandeData();
  }

  nextPage() {

    if(this.consultationFlag){
      this.router.navigate(['main/client/garantie',this.demandeCreditService.DemandeData.numDemande])
    }else{

      if(this.credit!=undefined && this.montant!=undefined && this.unite!=undefined && this.nbecheance!=undefined){
        this.router.navigate(['main/client/garantie']);
        this.demandeCreditService.DemandeData.type=this.credit.value;
        this.demandeCreditService.DemandeData.montant=Number(this.montant);
        this.demandeCreditService.DemandeData.unite=this.unite.value;
        this.demandeCreditService.DemandeData.nbreEcheance=Number(this.nbecheance);
        this.demandeCreditService.DemandeData.taux=this.typeCredit.find((item)=>item.value===this.credit.value).taux;
      }else{
        this.credit===undefined ? this.creditFlag = true : this.creditFlag = false
        this.montant===undefined? this.montantFlag = true : this.montantFlag = false
        this.unite===undefined? this.uniteFlag = true : this.uniteFlag = false
        this.nbecheance===undefined ?this.nbecheanceFlag = true : this.nbecheanceFlag = false
      }

    }
  }

  prevPage() {
    this.consultationFlag ? this.router.navigate(['main/client/info',this.demandeCreditService.DemandeData.numDemande]) : this.router.navigate(['main/client/info']);
  }
}


