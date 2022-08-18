import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCalendar, MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { CalendarioService } from 'src/app/services/calendario.service';
import { CreaEventoComponent } from '../crea-evento/crea-evento.component';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

  @ViewChild('calendar') calendar: MatCalendar<Date>;

  public eventi: any[] = [];
  public settore: string = '';
  public search_term:any = '';
  public page: number=0;
  public size: number=10;
  settori = [
    "ACR", "GVS", "GVN", "ADULTI"
  ];
  selectedDate = new Date();
  days: number[]= [];
  isReady: boolean = false;

  constructor(
    public dialog: MatDialog,
    private calendarioService: CalendarioService
  ) { }

  ngOnInit(): void {
    this.settore="GVN";
    console.log(this.selectedDate);
    this.ottieniEventi();

  }

  ottieniEventi(){
    this.eventi=[];
    this.calendarioService.ottieniEventi({
      settore: this.settore,
      month: this.selectedDate.getMonth()+1
    }).subscribe( (resp:any[]) => {
      console.log("resp", resp);
      this.eventi=resp;
      this.days=[];
      this.giorniSelezionati();
      this.isReady=true;
      this.calendar.updateTodaysDate();
    }, err => {
      window.alert("Errore, non è stato possibile recuperare gli eventi");
    })
  }

  giorniSelezionati(){
    this.eventi.forEach(ev => {
      if(!this.days.includes(ev.day)){
        this.days.push(ev.day);
      }
    });

  }

  cambioSettore(event:any){
    this.settore=event.value;
  }

  creaEvento(date?:any){
    if(date!=undefined){
      console.log("data selezionata", date);
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
      this.isReady=false;
      this.ottieniEventi();
      // salva risultato

      // mostra sul calendario
    })
  }

  cambioMese(event:any){
    
  }

  cambioMeseCalendar(calendar: MatCalendar<Date>){
    if(this.isReady && (this.selectedDate.getMonth()!=calendar.activeDate.getMonth())){
      this.selectedDate.setMonth(calendar.activeDate.getMonth());
      this.ottieniEventi();
    }
   
  }

  dateOccupate () {
   this.cambioMeseCalendar(this.calendar);
   return (date: Date): MatCalendarCellCssClasses => {
      if (this.days.includes(date.getDate())) {
        return 'data-occupata';
      } else {
        return '';
      }
    };    
  }
}
