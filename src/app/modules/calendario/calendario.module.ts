import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './calendario/calendario.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CreaEventoComponent } from './crea-evento/crea-evento.component';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { InfoEventoComponent } from './info-evento/info-evento.component';

const routes : Routes =[
  {
    path: '', component: CalendarioComponent
  }
]

@NgModule({
  declarations: [
    CalendarioComponent,
    CreaEventoComponent,
    InfoEventoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatSelectModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule
  ]
})
export class CalendarioModule { }
