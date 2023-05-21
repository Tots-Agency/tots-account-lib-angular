import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { TotsAccountService } from '../services/tots-account.service';

@Injectable({
  providedIn: 'root'
})
export class TotsAccountResolver implements Resolve<boolean> {

  constructor(
    protected accountService: TotsAccountService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.refresh().pipe(map(accounts => true));
  }
}
