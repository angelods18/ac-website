import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarioService } from 'src/app/services/calendario.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-info-evento',
  templateUrl: './info-evento.component.html',
  styleUrls: ['./info-evento.component.scss']
})
export class InfoEventoComponent implements OnInit {

  evento:any;
  eventiGiorno: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<InfoEventoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private calendarioService: CalendarioService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    if(this.data!=undefined){
      console.log("dati in ingresso", this.data);
      if(this.data.eventi!=undefined){
        this.eventiGiorno=this.data.eventi;
        if(this.eventiGiorno.length>0){
          this.calendarioService.getEvento(this.eventiGiorno[0].id).subscribe((resp:any)=>{
            console.log("evento", resp);
            this.evento=resp;
          })
        }
        
      }
    }
  }

  getSettore(settore:string){
    return this.utilService.getSettoreFromSigla(settore);
  }

}
