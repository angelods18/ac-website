import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { SidebarComponent } from './layout/partials/sidebar/sidebar.component';
import { HeaderComponent } from './layout/partials/header/header.component';
import { RouterModule } from '@angular/router';
import { MatIconModule} from '@angular/material/icon';
import { HomepageComponent } from './layout/homepage/homepage.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button'
import { HttpClientModule } from '@angular/common/http';
import { InsertCredentialsComponent } from './dialog/insert-credentials/insert-credentials.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    HomepageComponent,
    InsertCredentialsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule
  ],
  exports:[
    DashboardComponent,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class SharedModule { }
