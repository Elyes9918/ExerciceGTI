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

@Component({
  selector: 'app-garanties-porpose-step',
  templateUrl: './garanties-porpose-step.component.html',
  styleUrls: ['./garanties-porpose-step.component.scss']
})
export class GarantiesPorposeStepComponent implements OnInit {

  genderOptions: SelectItem[] = [
    { label: "Choisir", value: null },
    { label: "Type 1", value: "0" },
    { label: "Type 2", value: "1" },
  ];

  protected data : any;

  selectedUsers: any = [];

  userForm!: FormGroup;

  valSwitch!:Boolean

  values = [
    { nature: "", type: "0", valeur: "0", devise: false },
  ];

  constructor( private router: Router,private formBuilder: FormBuilder,
    private messageService: MessageService) { }

  get usersDetails(): FormArray {
    return this.userForm.get("usersDetails") as FormArray;
  }

  ngOnInit() { 
    this.userForm = this.formBuilder.group({
      usersDetails: this.formBuilder.array([]),
    });
    this.populateData();
  }

  onAdd() {
    this.userForm.markAllAsTouched();
    this.usersDetails.push(this.addControls());
  }

  onDelete() {
    if (this.selectedUsers.length < 1) {
      this.messageService.add({
        severity: "warn",
        summary: "Info",
        detail: "Please select a record to delete!",
      });
      return;
    }
    console.log(this.selectedUsers);
    for (var i = this.selectedUsers.length - 1; i >= 0; i--) {
      this.usersDetails.controls.splice(this.selectedUsers[i] - 1, 1);
    }
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "Selected records deleted!",
    });
 
    this.selectedUsers = [];
  }
 
  /**
   * click on  submit button
   */
  onSubmit() {
    this.data = JSON.stringify(this.usersDetails.value);
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
    this.values.forEach((data, index) => {
      this.onAdd();
      this.usersDetails.controls[index].setValue(data);
    });
  }





  nextPage() {
    this.router.navigate(['main/client/documents']);
  }

  prevPage() {
      this.router.navigate(['main/client/dossier']);
  }
}

