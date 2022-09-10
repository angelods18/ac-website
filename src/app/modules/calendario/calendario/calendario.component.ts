import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCalendar, MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { CalendarioService } from 'src/app/services/calendario.service';
import { CreaEventoComponent } from '../crea-evento/crea-evento.component';
import { InfoEventoComponent } from '../info-evento/info-evento.component';

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
    "TUTTI","ACR", "GVS", "GVN", "ADULTI"
  ];
  selectedDate = new Date();
  days: number[]= [];
  isReady: boolean = false;
  breakpoint:any = 3;
  listaEventi: any[] = [];

  constructor(
    public dialog: MatDialog,
    private calendarioService: CalendarioService
  ) { }

  ngOnInit(): void {
    this.settore="GVN";
    console.log(this.selectedDate);
    this.ottieniEventi();
    this.breakpoint = (window.innerWidth < 1000) ? 1 : 3;
  }

  ottieniEventi(){
    this.eventi=[];
    //Eventi per mese selezionato
    this.calendarioService.ottieniEventi({
      settore: this.settore!="TUTTI"?this.settore:null,
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

    //Eventi dal momento attuale in poi
    this.calendarioService.ottieniEventi().subscribe((resp:any[]) => {
      this.listaEventi=resp;
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
    this.ottieniEventi();
  }

  clickEvento(date?: Date){
    if(this.days.includes(date.getDate())){
      this.apriEvento(date);
    }else{
      this.creaEvento(date);
    }
  }

  apriEvento(date?:Date){
    let eventiGiorno = this.eventi.filter(e => e.day === date.getUTCDate()+1);
    console.log(eventiGiorno);
    // apri dialog info-evento
    const dialogRef = this.dialog.open(InfoEventoComponent, {
      width:'800px',
      data: {
        eventi: eventiGiorno,
        settore: this.settore
      }
    })
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
    this.ottieniEventi();
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

  onResize(){
    this.breakpoint = (window.innerWidth < 1000) ? 1 : 3;
  }
}
