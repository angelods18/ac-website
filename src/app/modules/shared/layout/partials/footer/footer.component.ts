import { Component, OnInit, Input } from '@angular/core';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isOpen:any;
  diocesi: any;
  
  constructor(
    public appConfig: AppConfigService
  ) { }

  ngOnInit(): void {
    this.diocesi=this.appConfig.diocesi;
  }

  toggleFooter(){
    this.isOpen=!this.isOpen;
  }

  logHover(){
    console.log('hover')
  }

}
