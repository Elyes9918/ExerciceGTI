import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FichierService } from '../../service/fichier.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-documents-step',
  templateUrl: './documents-step.component.html',
  styleUrls: ['./documents-step.component.scss']
})
export class DocumentsStepComponent implements OnInit {

  uploadedFiles: any[] = [];

  bulletainPaieStatus:boolean = false;
  cinStatus:boolean = false;

  constructor( private router: Router,private fichierService:FichierService) { }

  ngOnInit() { 
    
  }

  onUploadBP(event: any) {
    for (const file of event.files) {
      this.fichierService.upload(file,"1","1").subscribe(
      (event: any) => {
        if (event instanceof HttpResponse) {
          console.log(event.body.message)
        }
      },
      (err: any) => {
      });
    }
    this.bulletainPaieStatus=true;
  }

  onUploadCin(event: any) {

    for (const file of event.files) {
      this.fichierService.upload(file,"1","2").subscribe(
      (event: any) => {
        if (event instanceof HttpResponse) {
          console.log(event.body.message)
        }
      },
      (err: any) => {
      });
    }
    this.bulletainPaieStatus=false;
  }

 
  nextPage() {
    this.router.navigate(['main/client/observation']);
  }

  prevPage() {
      this.router.navigate(['main/client/garantie']);
  }
}

