import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IncontroService } from 'src/app/services/incontro.service';
import { InsertCredentialsComponent } from '../../shared/dialog/insert-credentials/insert-credentials.component';

@Component({
  selector: 'app-crea-nuovo',
  templateUrl: './crea-nuovo.component.html',
  styleUrls: ['./crea-nuovo.component.scss']
})
export class CreaNuovoComponent implements OnInit {

  settore: string;
  tag:string;
  incontro: any ={
    tags:[]
  };
  fileName:string;
  uploadFiles: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private incontroService: IncontroService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param:any) => {
      this.settore=param.params.settore;
      this.incontro.settore=this.settore;
    })
  }

  rimuoviTag(tagIndex: number){
    this.incontro.tags.splice(tagIndex,1);
    console.log(this.incontro.tags);
  }

  onTagSubmit(){
    this.incontro.tags.push(this.tag);
    this.tag="";
  }

  creaIncontro(){
    const dialogRef = this.dialog.open(InsertCredentialsComponent, {
      width:'450px'
    })
    dialogRef.afterClosed().subscribe(data => {
      if(data!=undefined){
        console.log("data from dialog", data);
        console.log("request", this.incontro);
        this.incontroService.salvaIncontro(this.incontro, data).subscribe((resp:any) => {
          console.log(resp);
          if(this.uploadFiles!=undefined && this.uploadFiles.length>0){
            this.uploadFile(resp.id);
          }
        }, err => {
          window.alert("Inserimento incontro non riuscito, riprovare");
        });
      }
    })
  }

  uploadFile(incontroId: string){
    const formData = new FormData();
    this.uploadFiles.forEach(f => {
      formData.append("files", f.file);
    });
    this.incontroService.salvaAllegati(incontroId, formData).subscribe((resp:any) => {
      console.log("risposta salva allegati",resp);
      window.alert("Incontro inserito con successo");
      setTimeout(() => {
        this.router.navigate(['/settore/'+this.settore]);
      }, 2000);
    }, err => {
      window.alert("Caricamento allegati fallito");
    })
  }

  onFileSelected(input){
    const file: File = input.target.files[0];
    if(file){
      this.fileName=file.name;
      this.uploadFiles.push({
        file: file,
        filename: this.fileName
      })
    }
  }

  rimuoviFile(index:number){
    this.uploadFiles.splice(index,1);
  }

  errore(campo:any){
    let errore = false;
    switch(campo){
      case "titolo":
        errore = (this.incontro.titolo!=undefined && this.incontro.titolo.length < 3)
        break;
      case "parrocchia":
        errore = (this.incontro.parrocchia!=undefined && this.incontro.parrocchia.length < 10)
        break;
      case "obiettivo":
        errore = (this.incontro.obiettivo!=undefined && this.incontro.obiettivo.length < 20)
        break;
      case "descrizione":
        errore = (this.incontro.descrizione!=undefined && this.incontro.descrizione.length < 100)
        break;
    }
    return errore;
  }

  validateForm(){
  
    let isError = (this.errore('titolo') ||
        this.errore('parrocchia') ||
        this.errore('obiettivo') ||
        this.errore('descrizione'));
    let basicValidation = (this.incontro.titolo==undefined || 
        this.incontro.parrocchia==undefined ||
        this.incontro.obiettivo==undefined ||
        this.incontro.descrizione== undefined)
    console.log("errore", basicValidation);
    return isError || basicValidation;
  }
}

export interface Incontro {
  titolo:string
}