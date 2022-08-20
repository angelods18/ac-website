import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IncontroService } from 'src/app/services/incontro.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-info-incontro',
  templateUrl: './info-incontro.component.html',
  styleUrls: ['./info-incontro.component.scss']
})
export class InfoIncontroComponent implements OnInit {

  incontro: any;
  constructor(
    public dialogRef: MatDialogRef<InfoIncontroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utilService:UtilService,
    private incontroService: IncontroService
  ) { }

  ngOnInit(): void {
    if(this.data!=undefined){
      console.log("dati in ingresso", this.data);
      if(this.data.incontroId!=undefined){
        this.incontroService.getIncontro(this.data.incontroId).subscribe((resp:any)=> {
          console.log(resp);
          this.incontro=resp;
        })
      }
    }
  }

  getSettore(settore:string){
    return this.utilService.getSettoreFromSigla(settore);
  }

}
