import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config.service';

@Injectable()
export class MyInterceptor implements HttpInterceptor {

  constructor(
    private appConfig: AppConfigService
  ){}

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let req = httpRequest.clone({
      headers: httpRequest.headers.append("Diocesi", this.appConfig.diocesi)
    });
    
    console.log("HEADERS", req.headers);
    console.log("URL REQUEST", httpRequest.url);
    return next.handle(req);
  }
}