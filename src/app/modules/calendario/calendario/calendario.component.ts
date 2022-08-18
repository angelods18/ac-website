import { Component, OnInit } from '@angular/core';
import { MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { CreaEventoComponent } from '../crea-evento/crea-evento.component';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

  public incontri: any[] = [];
  public settore: string = '';
  public search_term:any = '';
  public page: number=0;
  public size: number=10;
  settori = [
    "ACR", "GVS", "GVN", "ADULTI"
  ];
  selectedDate = Date.now();
  
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.settore="ACR";
    console.log(this.selectedDate)
  }

  cambioSettore(event:any){
    this.settore=event.value;
  }

  creaEvento(date?:any){
    if(date!=undefined){
      console.log("data selezionata", event);
      this.selectedDate=date;
    }
    const dialogRef = this.dialog.open(CreaEventoComponent, {
      width: '800px',
      data: {
        date: date,
        settore: this.settore
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // salva risultato

      // mostra sul calendario
    })
  }


  dateOccupate () {
    return (date: Date): MatCalendarCellCssClasses => {
      if (date.getDate() === 1) {
        return 'data-occupata';
      } else {
        return '';
      }
    };
  }
}
