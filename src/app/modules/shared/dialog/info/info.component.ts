import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConfigService } from 'src/app/services/app-config.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  url: any;
  urlConvert: any;
  info: any;

  constructor(
    public dialogRef: MatDialogRef<InfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public appConfig: AppConfigService
  ) { }

  ngOnInit(): void {
    if(this.data!=undefined){
      console.log("dati in ingresso", this.data);
      if(this.data.url!=undefined){
        this.url=this.data.url.substring(1);
        this.convertiUrl(this.url);
        this.info = this.appConfig.getInfoPerPagine(this.urlConvert);
        console.log(this.info);
      }
    }

  }

  convertiUrl(url){
    let urlSegments: any[] = url.split("/");
    if(urlSegments[0]==="settore" && urlSegments.length == 2){
      this.urlConvert="settore-incontri"
    }
    if(urlSegments[0]==="settore" && urlSegments[2]==="crea-nuovo"){
      this.urlConvert="crea-incontro"
    }
    if(urlSegments[0]==="calendario"){
      this.urlConvert="calendario"
    }
  }

}
