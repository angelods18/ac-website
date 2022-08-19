import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UtilService } from './services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private utilService:UtilService
  ) {
    console.log("is production?: ", environment.production);
  }
  title = 'ac-web-database';
}
