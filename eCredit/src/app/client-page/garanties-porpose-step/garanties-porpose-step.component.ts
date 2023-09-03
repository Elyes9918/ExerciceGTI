import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor( private router: Router,private formBuilder: FormBuilder, private messageService: MessageService,
    private DemandeCreditService:DemandeService) { }

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
    this.populateData();
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
    this.DemandeCreditService.DemandeData.garantieRequests=this.processGaranties(this.garantiesDetails.value);
  }

  processGaranties(garantiesJson: any[]): any[] {
    // Iterate through each object in the array
    const processedGaranties = garantiesJson.map((garantie) => {
      // Extract "value" from "natureGarantie" and "typeGarantie" objects
      const natureGarantie = garantie.natureGarantie.value;
      const typeGarantie = garantie.typeGarantie.value;
      const devise = garantie.devise.value;
  
      // Create a new object with extracted values and the untouched "valeur" property
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
  private populateData() {
    this.initialValues.forEach((data, index) => {
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



  nextPage() {
    this.router.navigate(['main/client/documents']);
  }

  prevPage() {
      this.router.navigate(['main/client/dossier']);
  }
}

