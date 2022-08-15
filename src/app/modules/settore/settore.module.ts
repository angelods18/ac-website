import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettoreComponent } from './settore/settore.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SettoreComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SettoreModule { }
