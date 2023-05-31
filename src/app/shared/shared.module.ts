import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {MotorcycleshopNavbarComponent} from './components/motorcycleshop-navbar/motorcycleshop-navbar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  declarations: [
    MotorcycleshopNavbarComponent,
    SearchBarComponent,
    LoadingSpinnerComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatToolbarModule
  ],
  exports: [
    MotorcycleshopNavbarComponent,
    LoadingSpinnerComponent,

  ]
})
export class SharedModule { }
