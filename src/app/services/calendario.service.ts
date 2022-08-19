import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  baseUrl: string = this.appConfig.baseUrl;

  constructor(
    private httpClient: HttpClient,
    private appConfig: AppConfigService
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

  getEvento(eventoId:string){
    let url = this.baseUrl+ 'evento/'+eventoId;

    return this.httpClient.get(url);
  }
}
