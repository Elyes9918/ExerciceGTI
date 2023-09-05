import { Garantie } from './Garantie';
export interface DemandeCreditRequest {
    numDemande?:number;
    ncin:number;
    ncompte:number;
    type:number;
    montant:number;
    unite:number;
    nbreEcheance:number;
    observation:string;
    taux?:number;
    garantieRequests:Garantie[];
}