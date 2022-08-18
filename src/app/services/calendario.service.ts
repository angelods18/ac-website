import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  baseUrl: string = "http://localhost:8080/";

  constructor(
    private httpClient: HttpClient
  ) { }

  salvaEvento(evento:any){
    let url = this.baseUrl + 'evento/salva-evento';

    return this.httpClient.post(url, evento);
  }

  ottieniEventi(request?:any){
    let url = this.baseUrl + 'evento/eventi';
    let params = new HttpParams();
    if(request?.settore!=undefined){
      params = params.append("settore", request.settore)
    }
    if(request?.month!=undefined){
      params =params.append("month", request.month)
    }
    return this.httpClient.get(url, {params: params});
  }
}
