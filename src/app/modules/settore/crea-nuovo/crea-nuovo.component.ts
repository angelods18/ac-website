import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppConfigService } from 'src/app/services/app-config.service';
import { IncontroService } from 'src/app/services/incontro.service';
import { InsertCredentialsComponent } from '../../shared/dialog/insert-credentials/insert-credentials.component';
import { map,startWith } from 'rxjs/operators';

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
  initialTags: string[] = [];
  tagOptions: string[] = [];
  filterTags: Observable<String[]>;
  tagControl = new FormControl('');

  constructor(
    private activatedRoute: ActivatedRoute,
    private incontroService: IncontroService,
    private router: Router,
    public dialog: MatDialog,
    public appConfig: AppConfigService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param:any) => {
      this.settore=param.params.settore;
      this.incontro.settore=this.settore;
      this.initialTags=this.appConfig.getTagsPerSettore(this.settore.toLowerCase());
      this.tagOptions=this.initialTags;
      this.filterTags = this.tagControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tagOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  getTags(){
    this.tagOptions=this.initialTags;
    this.incontroService.getTags(this.tag).subscribe((data:any) => {
      let tags = [];
      data.content.forEach(tag => {
        tags.push(tag.tag)
      });
      this.tagOptions = this.tagOptions.concat(tags);
      this.filterTags = this.tagControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
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
        this.errore('obiettivo') ||
        this.errore('descrizione'));
    let basicValidation = (this.incontro.titolo==undefined || 
        this.incontro.parrocchia==undefined ||
        this.incontro.obiettivo==undefined ||
        this.incontro.descrizione== undefined)
    return isError || basicValidation;
  }
}

export interface Incontro {
  titolo:string
}