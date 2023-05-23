import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TotsAccountService } from '../services/tots-account.service';

@Injectable()
export class TotsAccountInterceptor implements HttpInterceptor {

  constructor(
    protected accountService: TotsAccountService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.accountService.accountSelected.value == undefined){
      return next.handle(request);
    }

    let body: any = request.body;
    if(body){
      body.account_id = this.accountService.accountSelected.value!.id!;
    }
    
    return next.handle(request.clone({
      params: request.params.set('account_id', this.accountService.accountSelected.value!.id!),
      body: body
    }));
  }
}
