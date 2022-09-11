import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private appConfig: any;
  private http: HttpClient;

  constructor(handler: HttpBackend) { 
    this.http = new HttpClient(handler);
  }

  loadAppConfig(){
    if(environment.production){
      return this.http.get('/assets/config-prod.json')
      .toPromise()
      .then(data => {
          this.appConfig = data;
      });
    }else{
      return this.http.get('/assets/config.json')
      .toPromise()
      .then(data => {
          this.appConfig = data;
      });
    }
    
  }

  get diocesi() {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }
    if (this.appConfig.mode == "dev") {
        return "Gaeta"
    }
    return this.appConfig.diocesi;
  }

  get baseUrl() {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }
    if (this.appConfig.mode == "dev") {
        return "http://localhost:8080"
    }
    return this.appConfig.baseUrl;
  }

  getTagsPerSettore(settore: string){
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }
    if (this.appConfig.mode == "dev") {
        return "http://localhost:8080"
    }
    return this.appConfig.paroleChiave[settore];
  }

  getInfoPerPagine(url: string){
    console.log(url);
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }
    if (this.appConfig.mode == "dev") {
        return "http://localhost:8080"
    }
    return this.appConfig.infoPagine[url];
  }
}
