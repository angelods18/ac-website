import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettoreComponent } from './modules/settore/settore/settore.component';
import { HomepageComponent } from './modules/shared/layout/homepage/homepage.component';


const routes: Routes = [
  {
    path:'', component: HomepageComponent
  },
  { 
    path: 'settore', loadChildren: () => import('./modules/settore/settore.module').then(m => m.SettoreModule) },
  {
    path:'calendario',
    loadChildren: () => import('./modules/calendario/calendario.module').then(m => m.CalendarioModule)
  },
  {
    path: 'feedback', loadChildren: () => import('./modules/feedback/feedback.module').then(m => m.FeedbackModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
