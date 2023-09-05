import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MessageService, SelectItem } from "primeng/api";
import { GlobalVariables } from 'src/app/globalVariable';
import { DemandeService } from 'src/app/service/demande.service';

@Component({
  selector: 'app-garanties-porpose-step',
  templateUrl: './garanties-porpose-step.component.html',
  styleUrls: ['./garanties-porpose-step.component.scss']
})
export class GarantiesPorposeStepComponent implements OnInit {

  typeGaranties!: any[];
  filteredTypes: any[] = [];

  natureGaranties!: any[];
  filteredNatures: any[] = [];

  devises!: any[];
  filteredDevises: any[] = [];


  initialValues = [
    { natureGarantie: "", typeGarantie: "", valeur: "", devise: "" },
  ];

  protected data : any;

  selectedGaranties: any = [];

  userForm!: FormGroup;

  valSwitch!:Boolean

  areGarantiesSubmited:boolean=false;
  ValidationFlag:boolean=false
  backFlag:boolean=false;

  consultationFlag:boolean=false;

  constructor( private router: Router,
    private formBuilder: FormBuilder, 
    private messageService: MessageService,
    private DemandeCreditService:DemandeService,
    private route:ActivatedRoute
    ) { }

  get garantiesDetails(): FormArray {
    return this.userForm.get("garantiesDetails") as FormArray;
  }

  ngOnInit() { 

    this.typeGaranties = GlobalVariables.typeGaranties;
    this.natureGaranties = GlobalVariables.garanties;
    this.devises = GlobalVariables.devise;

    this.userForm = this.formBuilder.group({
      garantiesDetails: this.formBuilder.array([]),
    });


    this.route.params.subscribe(
      (params:Params)=>{        
        if(params['id']!=null){
          this.consultationFlag=true;
          this.getDemandeById(params['id']);
        }
      }
    )


    if(!this.consultationFlag){
  
      if(this.DemandeCreditService.DemandeData.garantieRequests.length===0){
        this.populateData(this.initialValues);
      }else{
        this.backFlag=true;
        this.populateData(this.processInitialData(this.DemandeCreditService.DemandeData.garantieRequests));
      }

    }

  }

  getDemandeById(id:number){
    this.DemandeCreditService.getDemandeById(id).subscribe(
      (response:any)=>{
        this.populateData(this.processInitialData(this.transformArray(this.DemandeCreditService.DemandeData.garantieRequests)))
      }
    )
  }

  transformArray(originalArray: any[]): any[] {
    return originalArray.map((originalObject) => {
      const {
        devise=originalObject.devise,
        natureGarantie=originalObject.nature,
        typeGarantie=originalObject.type,
        valeur=originalObject.valeur,
      } = originalObject;
  
      return {
        devise,
        natureGarantie,
        typeGarantie,
        valeur,
      };
    });
  }

  processInitialData(data: any[]): any[] {

    if(this.consultationFlag){

      for (const obj of data) {
        obj.natureGarantie = this.natureGaranties.find((item)=>item.value===obj.natureGarantie);
        obj.typeGarantie = this.typeGaranties.find((item)=>item.value===obj.typeGarantie);
        obj.devise = this.devises.find((item)=>item.value===obj.devise);
      }
      return data;

    }else{

      for (const obj of data) {
        obj.natureGarantie = this.natureGaranties.find((item)=>item.value===obj.natureGarantie);
        obj.typeGarantie = this.typeGaranties.find((item)=>item.value===obj.typeGarantie);
        obj.devise = this.devises.find((item)=>item.value===obj.devise);
      }
      return data;

    }
    
  }


  onAdd() {
    this.userForm.markAllAsTouched();
    this.garantiesDetails.push(this.addControls());
  }

  onDelete() {
    if (this.selectedGaranties.length < 1) {
      this.messageService.add({
        severity: "warn",
        summary: "Info",
        detail: "Please select a record to delete!",
      });
      return;
    }
    for (var i = this.selectedGaranties.length - 1; i >= 0; i--) {
      this.garantiesDetails.controls.splice(this.selectedGaranties[i] - 1, 1);
    }
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "Selected records deleted!",
    });
 
    this.selectedGaranties = [];
  }
 

  onSubmit() {

    if(this.AllFieldsAreNotEmpty(this.processGaranties(this.garantiesDetails.value))){
      this.ValidationFlag=false;
      this.areGarantiesSubmited=true;
      this.DemandeCreditService.DemandeData.garantieRequests=this.processGaranties(this.garantiesDetails.value);     
    }else{
      this.ValidationFlag=true;
    }
  } 

  AllFieldsAreNotEmpty(data:any):boolean{
    for (const obj of data) {
      if (
        obj.natureGarantie === undefined ||
        obj.typeGarantie === undefined ||
        obj.valeur === null ||
        obj.devise === undefined
      ) {
        return false;
      }
    }
    return true;
  }


  processGaranties(garantiesJson: any[]): any[] {
    // Iterate through each object in the array
    const processedGaranties = garantiesJson.map((garantie) => {
      // Extract "value" from "natureGarantie" and "typeGarantie" objects
      const natureGarantie = garantie.natureGarantie.value;
      const typeGarantie = garantie.typeGarantie.value;
      const devise = garantie.devise.value;
  
      return {
        natureGarantie,
        typeGarantie,
        valeur: garantie.valeur,
        devise,
      };
    });
  
    return processedGaranties;
  }
 
  /**
   * return user detail controls for given index
   * @param index - number
   */
  userDetailsControls(index: number) {
  }
 
  /**
   * Add control into Form
   */
  private addControls() {
    return new FormGroup({
      natureGarantie: new FormControl(""),
      typeGarantie: new FormControl(""),
      valeur: new FormControl(null),
      devise: new FormControl(""),
    });


  }
 
  /**
   * Populate data into Form
   */
  private populateData(initialData:any) {
    initialData.forEach((data:any, index:any) => {
      this.onAdd();
      this.garantiesDetails.controls[index].setValue(data);
    });
  }

  filterType(event: any) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.typeGaranties.length; i++) {
        const typeGarantie = this.typeGaranties[i];
        if (typeGarantie.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(typeGarantie);
        }
    }
    this.filteredTypes = filtered;
  }

  filterNature(event: any) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.natureGaranties.length; i++) {
        const natureGarantie = this.natureGaranties[i];
        if (natureGarantie.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(natureGarantie);
        }
    }
    this.filteredNatures = filtered;
  }

  filterDevise(event: any) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.devises.length; i++) {
        const devise = this.devises[i];
        if (devise.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(devise);
        }
    }
    this.filteredDevises = filtered;
  }

  backToAdmin(){
    this.router.navigate(['main/admin']);
    this.DemandeCreditService.InitiliazeDemandeData();
  }

  nextPage() {

    if(this.consultationFlag){
      this.router.navigate(['main/client/documents',this.DemandeCreditService.DemandeData.numDemande])
    }else{
      this.router.navigate(['main/client/documents']);
    }
  }

  prevPage() {
    if(this.consultationFlag){
      this.router.navigate(['main/client/dossier',this.DemandeCreditService.DemandeData.numDemande]);
    }else{
      if(this.backFlag){
      this.onSubmit()
    }
      this.router.navigate(['main/client/dossier']);

    }
    

  }
}

