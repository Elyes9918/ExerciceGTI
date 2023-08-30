import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ClientPageComponent } from './client-page/client-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { InfoClientStepComponent } from './client-page/info-client-step/info-client-step.component';
import { DossierCreditStepComponent } from './client-page/dossier-credit-step/dossier-credit-step.component';
import { GarantiesPorposeStepComponent } from './client-page/garanties-porpose-step/garanties-porpose-step.component';
import { ObservationStepComponent } from './client-page/observation-step/observation-step.component';
import { DocumentsStepComponent } from './client-page/documents-step/documents-step.component';
import { ConfirmationStepComponent } from './client-page/confirmation-step/confirmation-step.component';


const routes: Routes = [
  {
    path:'main',component:AppLayoutComponent,
    children:[
      {path:'client',component:ClientPageComponent,
        children:[
          {path:'info',component:InfoClientStepComponent},
          {path:'dossier',component:DossierCreditStepComponent},
          {path:'garantie',component:GarantiesPorposeStepComponent},
          {path:'documents',component:DocumentsStepComponent},
          {path:'observation',component:ObservationStepComponent},
          {path:'confirmation',component:ConfirmationStepComponent}
        ]
      },
      {path:'admin',component:AdminPageComponent}

    ]
  },

  {path:'',component:LoginPageComponent},
  {path:'**',redirectTo:''},
  {path:'',redirectTo:'/login',pathMatch:'full'}

  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
