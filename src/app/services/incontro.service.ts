import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class IncontroService {

  baseUrl: string = this.appConfig.baseUrl;

  constructor(
    private httpClient: HttpClient,
    private appConfig: AppConfigService
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

  salvaAllegati(incontroId: string, files: FormData){
    let url = this.baseUrl + "incontro/"+incontroId+"/salva-allegati";

    return this.httpClient.post(url, files);
  }
}
