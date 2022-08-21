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
  index:number=undefined;

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
          this.index=0;
          this.getEventoByIndex(this.index);
        }
        
      }
    }
  }

  getLocandina(){
    if(this.evento!=undefined &&this.evento.locandina!=null && 
      this.evento.locandina!=undefined && this.evento.locandina.length>0) {
      return this.utilService.getMedia(this.evento.locandina[0].id);
    }else{
      return null;
    }
  }

  getEventoByIndex(index:number){
    this.calendarioService.getEvento(this.eventiGiorno[this.index].id).subscribe((resp:any)=>{
      console.log("evento", resp);
      this.evento=resp;
    })
  }

  isBeforeFirst(){  
    return ((this.index >= this.eventiGiorno.length-1) && this.eventiGiorno.length!=1);
  }

  isAfterFirst(){
    return (this.index < this.eventiGiorno.length-1);
  }

  goLeft(){
    this.index--;
    this.getEventoByIndex(this.index);
  }

  goRight(){
    this.index++;
    this.getEventoByIndex(this.index);
  }

  formatData(data:any){
    let giorno = data.split('T')[0];
    return giorno;
  }

  getSettore(settore:string){
    return this.utilService.getSettoreFromSigla(settore);
  }

}
