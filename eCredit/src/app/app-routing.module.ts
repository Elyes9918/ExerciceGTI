import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ClientPageComponent } from './client-page/client-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';


const routes: Routes = [
  {
    path:'main',component:AppLayoutComponent,
    children:[
      {path:'client',component:ClientPageComponent},
      {path:'admin',component:AdminPageComponent},

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
