import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { CalendarioService } from 'src/app/services/calendario.service';
import * as moment from 'moment';
import { UtilService } from 'src/app/services/util.service';
import { InsertCredentialsComponent } from '../../shared/dialog/insert-credentials/insert-credentials.component';

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
    private utilService: UtilService,
    public dialog: MatDialog
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
    const dialogRef = this.dialog.open(InsertCredentialsComponent, {
      width:'450px'
    })
    dialogRef.afterClosed().subscribe(data => {
      console.log("data from dialog", data);
      console.log(this.evento);
      if(data!=undefined){
        this.calendarioService.salvaEvento(this.evento, data).subscribe((resp:any) => {
          console.log(resp);
          if(this.file!=undefined){
            this.uploadFile(resp.id);
          }
        }, err => {
          window.alert("Errore, l'evento non è stato salvato");
        })
      }
    })
  }

  uploadFile(eventoId: string){
    const formData = new FormData();
   
    formData.append("file", this.file.file);
    
    this.calendarioService.salvaLocandina(eventoId, formData).subscribe((resp:any) => {
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

  errore(campo:any){
    let errore = false;
    switch(campo){
      case "titolo":
        errore = (this.evento.titolo!=undefined && this.evento.titolo.length < 3)
        break;
      case "orario":
        errore = (this.evento.orario!=undefined)
        break;
      case "luogo":
        errore = (this.evento.luogo!=undefined && this.evento.luogo.length < 20)
        break;
     
    }
    return errore;
  }

  validateForm(){
  
    let isError = (this.errore('titolo') ||
        this.errore('orario') ||
        this.errore('luogo'));
    let basicValidation = (this.evento.titolo==undefined || 
        this.evento.orario==undefined ||
        this.evento.luogo==undefined)
    console.log("errore", basicValidation);
    return isError || basicValidation;
  }

}
