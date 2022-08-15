import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettoreComponent } from './modules/settore/settore/settore.component';
import { HomepageComponent } from './modules/shared/layout/homepage/homepage.component';


const routes: Routes = [
  {
    path:'', component: HomepageComponent
  },
  {path: 'settore/:settore', component: SettoreComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
