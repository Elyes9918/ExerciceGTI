import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';



import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { ClientPageComponent } from './client-page/client-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { MessageService } from 'primeng/api'
import { ConfirmationService } from 'primeng/api';
import { InfoClientStepComponent } from './client-page/info-client-step/info-client-step.component';
import { DossierCreditStepComponent } from './client-page/dossier-credit-step/dossier-credit-step.component';
import { GarantiesPorposeStepComponent } from './client-page/garanties-porpose-step/garanties-porpose-step.component';
import { ObservationStepComponent } from './client-page/observation-step/observation-step.component';
import { ConfirmationStepComponent } from './client-page/confirmation-step/confirmation-step.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StepsModule } from 'primeng/steps';
import { DocumentsStepComponent } from './client-page/documents-step/documents-step.component';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { AutoCompleteModule } from "primeng/autocomplete";







@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ClientPageComponent,
    AdminPageComponent,
    InfoClientStepComponent,
    DossierCreditStepComponent,
    GarantiesPorposeStepComponent,
    ObservationStepComponent,
    ConfirmationStepComponent,
    DocumentsStepComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    AppLayoutModule,
    CommonModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    CommonModule,
		FormsModule,
		TableModule,
		RatingModule,
		SliderModule,
		ToggleButtonModule,
		RippleModule,
		MultiSelectModule,
		DropdownModule,
		ProgressBarModule,
		ToastModule,
    BrowserAnimationsModule,
    StepsModule,
    CardModule,
    CalendarModule,
    InputNumberModule,
    FileUploadModule,
    AutoCompleteModule

    
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
