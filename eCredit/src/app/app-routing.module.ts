import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { LoginPageComponent } from './login-page/login-page.component';


const routes: Routes = [
  {
    path:'',component:AppLayoutComponent,
    children:[
      {path:'',component:LoginPageComponent}
    ]
  }


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
