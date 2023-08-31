import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents-step',
  templateUrl: './documents-step.component.html',
  styleUrls: ['./documents-step.component.scss']
})
export class DocumentsStepComponent implements OnInit {

  cardName!:String;
  cardNumber!:String;

  uploadedFiles: any[] = [];



  constructor( private router: Router) { }

  ngOnInit() { 
  }


    onUpload(event: any) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }
        
    }

    onBasicUpload() {
        
    }
 

  nextPage() {
    this.router.navigate(['main/client/observation']);
  }

  prevPage() {
      this.router.navigate(['main/client/garantie']);
  }
}

