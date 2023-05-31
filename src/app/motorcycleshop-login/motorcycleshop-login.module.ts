import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MotorcycleshopLoginPageComponent } from './page/motorcycleshop-login-page/motorcycleshop-login-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [
    LoginFormComponent,
    MotorcycleshopLoginPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[
    MotorcycleshopLoginPageComponent
  ]
})
export class MotorcycleshopLoginModule { }
