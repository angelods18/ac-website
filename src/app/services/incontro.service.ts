import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    private appConfig: AppConfigService,
    private utilService: UtilService
  ) { }

  salvaIncontro(incontro:any, credentials:any){
    let url = this.baseUrl + "incontro/salva-incontro";
    let cred = credentials.username+":"+credentials.password;
    const options = {
      headers: new HttpHeaders({
        'authorization': 'Basic '+btoa(''+cred)
      })
    }
    return this.httpClient.post(url, incontro, options);
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

  getIncontro(incontroId:string){
    let url = this.baseUrl + "incontro/"+incontroId;

    return this.httpClient.get(url);
  }
}
