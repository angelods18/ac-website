import { HttpClient } from '@angular/common/http';
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
    let param = request!=undefined ? {
      request:request
    } : {};
    return this.httpClient.get(url, {params: param});
  }
}
