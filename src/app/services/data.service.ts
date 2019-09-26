import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../redux/app.state';
import { Store } from '@ngrx/store';
import { LoadHistory, LoadCalc } from '../redux/converter.action';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private client: HttpClient, private store: Store<AppState>) { }

  loadCurrency() {
    return this.client.get('https://api.exchangeratesapi.io/latest?base=USD').subscribe(currency => {
      this.store.dispatch(new LoadCalc(currency))
    })
  }

  loadHistory() {
    return this.client.get('https://api.exchangeratesapi.io/history?start_at=2018-09-01&end_at=2019-05-01&base=USD').subscribe(history => {
      this.store.dispatch(new LoadHistory(history))  
    })
  }
}
