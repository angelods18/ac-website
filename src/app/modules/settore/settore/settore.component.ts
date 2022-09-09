import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncontroService } from 'src/app/services/incontro.service';

@Component({
  selector: 'app-settore',
  templateUrl: './settore.component.html',
  styleUrls: ['./settore.component.scss']
})
export class SettoreComponent implements OnInit {

  public incontri: any[] = [];
  public settore: string = '';
  public search_term:any = '';
  public page: number=0;
  public size: number=10;
  settori = [
    "ACR", "GVS", "GVN", "ADULTI"
  ]

  constructor(
     private activatedRoute: ActivatedRoute,
     private router: Router,
     private incontroService: IncontroService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.settore=params.params.settore;
    });
    this.riempiListaIncontri();
  }

  riempiListaIncontri(){
    let params= {
      settore : this.settore
    }
    this.incontroService.getIncontri(params, this.page, this.size).subscribe( (resp:any) =>{
      console.log("risposta", resp);
      this.incontri.push(...resp.content);
    },err => {
      window.alert("Errore nel recuperare gli incontri");
    })
  }

  keypress(event:any){

  }

  onSearchSubmit(){
    console.log(this.search_term);
  }

  apriCreaIncontro(){
    this.router.navigate(['settore/'+this.settore+'/crea-nuovo']);
  }

  cambioSettore(event:any){
    console.log(event);
    this.settore=event.value;
    this.router.navigate(["/settore/"+this.settore])
    this.incontri=[];
    this.riempiListaIncontri();
  }
}
