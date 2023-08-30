import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthenticiationService } from '../service/authenticiation.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginPageComponent implements OnInit {

  valCheck: string[] = ['remember'];

  signInAsAdmin: boolean = false;

  password!: string;
  ncin!: number;


  constructor(public layoutService: LayoutService,private authService : AuthenticiationService,private router:Router) { 

  } 

 ngOnInit(): void {

  }

  doLogin(){

    console.log(this.ncin);
    console.log(this.password);


    (this.authService.authenticate(this.ncin,this.password)).subscribe(
      data=>{
        if(!this.signInAsAdmin){
          this.router.navigate(['/main/client'])
        }else{
          this.router.navigate(['/main/admin'])
        }
      }
    )



  }

}

