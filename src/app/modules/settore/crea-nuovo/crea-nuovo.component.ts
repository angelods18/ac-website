import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncontroService } from 'src/app/services/incontro.service';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private incontroService: IncontroService,
    private router: Router
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
    console.log("request", this.incontro);
    this.incontroService.salvaIncontro(this.incontro).subscribe(resp => {
      console.log(resp);
      window.alert("Incontro inserito con successo");
      setTimeout(() => {
        this.router.navigate(['/settore/'+this.settore]);
      }, 2000);
    }, err => {
      window.alert("Inserimento incontro non riuscito, riprovare");
    });
  }
}

export interface Incontro {
  titolo:string
}