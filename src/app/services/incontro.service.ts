import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IncontroService {

  baseUrl: string = "http://localhost:8080/";


  constructor(
    private httpClient: HttpClient
  ) { }

  salvaIncontro(incontro:any){
    let url = this.baseUrl + "incontro/salva-incontro";

    return this.httpClient.post(url, incontro);
  }

  getIncontri(params: any, page:number, size:number){
    let url = this.baseUrl + "incontro/incontri";
    return this.httpClient.get(url, {
      params: params
    })
  }
}
