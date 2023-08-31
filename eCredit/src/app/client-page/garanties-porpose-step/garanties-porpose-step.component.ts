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

@Component({
  selector: 'app-garanties-porpose-step',
  templateUrl: './garanties-porpose-step.component.html',
  styleUrls: ['./garanties-porpose-step.component.scss']
})
export class GarantiesPorposeStepComponent implements OnInit {

  enDevise: SelectItem[] = [
    { label: "Oui", value: "0" },
    { label: "Non", value: "1" },
  ];

  typeGaranties!: any[];

  initialValues = [
    { nature: "", type: "0", valeur: "0", devise: false },
  ];

  protected data : any;


  selectedGaranties: any = [];

  userForm!: FormGroup;

  valSwitch!:Boolean

 

  constructor( private router: Router,private formBuilder: FormBuilder, private messageService: MessageService) { }

  get garantiesDetails(): FormArray {
    return this.userForm.get("garantiesDetails") as FormArray;
  }

  ngOnInit() { 

    this.typeGaranties = GlobalVariables.typeGaranties;

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
    console.log(this.selectedGaranties);
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
 
  /**
   * click on  submit button
   */
  onSubmit() {
    this.data = JSON.stringify(this.garantiesDetails.value);
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
      nature: new FormControl(""),
      type: new FormControl(null),
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





  nextPage() {
    this.router.navigate(['main/client/documents']);
  }

  prevPage() {
      this.router.navigate(['main/client/dossier']);
  }
}

