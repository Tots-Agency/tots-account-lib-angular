import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TotsBaseHttpService, TotsCoreConfig, TotsQuery, TOTS_CORE_PROVIDER } from '@tots/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { TotsAccount } from '../entities/tots-account';
import { StorageMap } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class TotsAccountService extends TotsBaseHttpService<TotsAccount> {

  static readonly STORAGE_KEY = 'account_selected';

  accounts = new BehaviorSubject<Array<TotsAccount>>([]);
  accountSelected = new BehaviorSubject<TotsAccount|undefined>(undefined);
  accountSelectedId?: number;

  constructor(
    @Inject(TOTS_CORE_PROVIDER) protected override config: TotsCoreConfig,
    protected override http: HttpClient,
    protected storage: StorageMap
  ) {
    super(config, http);
    this.basePathUrl = 'accounts';
  }

  refresh(): Observable<Array<TotsAccount>> {
    this.loadAccountSelectedIdInStorage();

    let query = new TotsQuery();
    return this.list(query)
    .pipe(map(data => {
      this.accounts.next(data.data);

      if(data.data.length > 0 && this.accountSelectedId != undefined && this.accountSelectedId > 0){
        let account = TotsAccountService.getAccountById(this.accountSelectedId, data.data);
        if(account != undefined){
          this.accountSelected.next(account);
        } else {
          this.accountSelected.next(data.data[0]);
        }
      } else if(data.data.length > 0){
        this.accountSelected.next(data.data[0]);
      }
      
      return data.data;
    }));
  }

  loadAccountSelectedIdInStorage() {
    this.getAccountSelectedIdInStorage().subscribe(accountId => this.accountSelectedId = accountId);
  }

  getAccountSelectedIdInStorage(): Observable<number|undefined> {
    return this.storage.get<number>(TotsAccountService.STORAGE_KEY, { type: 'number' });
  }

  setAccountSelectedIdInStorage(accountId: number) {
    let account = TotsAccountService.getAccountById(accountId, this.accounts.value);

    if(account == undefined){
      return;
    } 

    this.storage.set(TotsAccountService.STORAGE_KEY, accountId, { type: 'number' }).subscribe(() => this.accountSelectedId = accountId);
    
    this.accountSelected.next(account);
  }

  static getAccountById(accountId: number, accounts: Array<TotsAccount>): TotsAccount|undefined {
    return accounts.find(account => account.id == accountId);
  }
}
