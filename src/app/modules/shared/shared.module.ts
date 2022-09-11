import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { SidebarComponent } from './layout/partials/sidebar/sidebar.component';
import { HeaderComponent } from './layout/partials/header/header.component';
import { RouterModule } from '@angular/router';
import { MatIconModule} from '@angular/material/icon';
import { HomepageComponent } from './layout/homepage/homepage.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { InsertCredentialsComponent } from './dialog/insert-credentials/insert-credentials.component';
import { FooterComponent } from './layout/partials/footer/footer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InfoComponent } from './dialog/info/info.component'
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    HomepageComponent,
    InsertCredentialsComponent,
    FooterComponent,
    InfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  exports:[
    DashboardComponent,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ]
})
export class SharedModule { }
