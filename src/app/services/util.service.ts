import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  openSidebarEvent = new EventEmitter<boolean>();
  public isSidebarOpen : boolean = false;
  config: any={};

  refreshIntervalEvent = new EventEmitter<boolean>();

  constructor(
    private httpClient: HttpClient
  ) {}

   checkLocaleDateString(localDate:string){
    let datePart = localDate.split('/');
    if(datePart[0].length===1){
      datePart[0]='0'+datePart[0];
    }
    if(datePart[1].length===1){
      datePart[1]='0'+datePart[1];
    }
    return datePart[2]+'-'+datePart[1]+'-'+datePart[0]+'T00:00:00.000Z';

   }

   getSettoreFromSigla(sigla:string){
    let sett = '';
    switch(sigla){
      case 'ACR':
        sett= 'ACR';
        break;
      case 'GVS':
        sett='Giovanissimi';
        break;
      case 'GVN':
        sett='Giovani';
        break;
      case 'ADULTI':
        sett='Adulti';
        break;
      default:
        sett=sigla;
        break;
    }
    return sett;
   }
}
