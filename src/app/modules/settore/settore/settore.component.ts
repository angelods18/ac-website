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
  filterTimeout: any = null;

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
      settore : this.settore,
      search: this.search_term.length >=3 ? this.search_term : ""
    }
    this.incontroService.getIncontri(params, this.page, this.size).subscribe( (resp:any) =>{
      console.log("risposta", resp);
      this.incontri.push(...resp.content);
    },err => {
      window.alert("Errore nel recuperare gli incontri");
    })
  }

  keypress(event:any){
    if(this.search_term.length>=3 || this.search_term.length==0){
      document.body.classList.add("waiting");
      clearTimeout(this.filterTimeout);
      this.filterTimeout= setTimeout(() => {
        this.onSearchSubmit();
        document.body.classList.remove("waiting");
      }, 1000)
    }
  }

  onSearchSubmit(){
    console.log("size", this.search_term.length)
    this.incontri=[];
    this.riempiListaIncontri();
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
