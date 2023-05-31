import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { MotorcycleshopRegisterPageComponent } from './pages/motorcycleshop-register-page/motorcycleshop-register-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [
    RegisterFormComponent,
    MotorcycleshopRegisterPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    MotorcycleshopRegisterPageComponent
  ]


})
export class MotorcycleshopRegisterModule { }
