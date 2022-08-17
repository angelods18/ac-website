import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettoreComponent } from './settore/settore.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FlexModule } from '@angular/flex-layout';
import { CreaNuovoComponent } from './crea-nuovo/crea-nuovo.component';
import { SettoreCardComponent } from './settore-card/settore-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

const routes: Routes =[
  {
    path: ':settore',
    component: SettoreComponent
  },
  {
    path:':settore/crea-nuovo',
    component: CreaNuovoComponent
  }
]
@NgModule({
  declarations: [
    SettoreComponent,
    CreaNuovoComponent,
    SettoreCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FlexModule,
    MatCardModule,
    MatSelectModule
  ]
})
export class SettoreModule { }
