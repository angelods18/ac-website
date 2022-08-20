import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { CalendarioService } from 'src/app/services/calendario.service';
import * as moment from 'moment';
import { UtilService } from 'src/app/services/util.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MM-YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-crea-evento',
  templateUrl: './crea-evento.component.html',
  styleUrls: ['./crea-evento.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class CreaEventoComponent implements OnInit {

  dataEvento = new FormControl(new Date());
  evento :any = {};
  recapito:string;
  recapiti: string[]=[];
  fileName: string;
  file:any;

  constructor(
    public dialogRef: MatDialogRef<CreaEventoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private calendarioService: CalendarioService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    if(this.data!=undefined){
      console.log("data selezionata in ingresso", this.data);
      if(this.data.date!=undefined){
        this.dataEvento.setValue(this.data.date);
        let dateUTC = moment.utc(this.data.date).local().toDate();
        this.evento.dataEvento=this.utilService.checkLocaleDateString(dateUTC.toLocaleDateString());
        console.log("data evento", this.evento.dataEvento);
      }
      this.evento.settore=this.data.settore;
    }
  }

  aggiornaData(){
    let dateUTC = moment.utc(this.dataEvento.value).local().toDate();
    this.evento.dataEvento=this.utilService.checkLocaleDateString(dateUTC.toLocaleDateString());
    
    console.log("data evento", this.evento.dataEvento);
  }


  creaEvento(){
    console.log(this.evento);
    this.calendarioService.salvaEvento(this.evento).subscribe((resp:any) => {
      console.log(resp);
      this.uploadFile(resp.id);
    }, err => {
      window.alert("Errore, l'incontro non è stato salvato");
    })
  }

  uploadFile(incontroId: string){
    const formData = new FormData();
   
    formData.append("file", this.file.file);
    
    this.calendarioService.salvaLocandina(incontroId, formData).subscribe((resp:any) => {
      console.log("risposta salva locandina",resp);
      window.alert("Evento inserito con successo");
      setTimeout(() => {
        this.dialogRef.close();
      }, 2000);
    }, err => {
      window.alert("Caricamento locandina fallito");
    })
  }

  onRecapitoSubmit(){
    this.recapiti.push(this.recapito);
    this.evento.recapiti=this.recapiti;
    this.recapito='';
  }

  rimuoviRecapito(index: number){
    this.recapiti.splice(index,1);
    this.evento.recapiti=this.recapiti;
  }

  onFileSelected(input){
    const file: File = input.target.files[0];
    if(file){
      this.fileName=file.name;
      this.file = {
        file: file,
        filename: this.fileName
      }
    }
  }

  rimuoviFile(){
    this.file=undefined;
  }

}
