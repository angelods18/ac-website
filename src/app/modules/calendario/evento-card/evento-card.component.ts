import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoEventoComponent } from '../info-evento/info-evento.component';

@Component({
  selector: 'app-evento-card',
  templateUrl: './evento-card.component.html',
  styleUrls: ['./evento-card.component.scss']
})
export class EventoCardComponent implements OnInit {

  @Input("evento") evento: any;
  hoverTitle: boolean;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log(this.evento);
  }

  apriEvento(){
    const dialogRef = this.dialog.open(InfoEventoComponent, {
      width:'800px',
      data: {
        eventi: [this.evento],
        settore: this.evento.settore
      }
    })
  }

  showHint(){
    this.hoverTitle=true;
  }

  hideHint(){
    this.hoverTitle=false;
  }

  formatData(data:any){
    let giorno = data.split('T')[0];
    return giorno;
  }

}
