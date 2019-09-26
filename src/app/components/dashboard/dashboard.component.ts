import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currencies = [];
  amountTo;

  currencyFromName;
  currencyToName;


  currencyForm = new FormGroup({
    amountFrom: new FormControl(''),
    currencyFrom: new FormControl(''),
    currencyTo: new FormControl(''),
  })

  constructor(private dataService: DataService, private store: Store<AppState>) { }

  ngOnInit() {
    this.dataService.loadCurrency();
    this.dataService.loadHistory()

    this.store.select('curValues', 'currency').subscribe((d: any) => {
      let rates = d.rates
      for (let prop in rates) {
        this.currencies.push({ name: prop, value: rates[prop] });
      }
      this.currencies.sort((a: any, b: any) => {
        return a.name.localeCompare(b.name)
      })
    })
  }

  currencyChangedFrom(event) {
    this.currencyFromName = event.value.name;
    this.calculate(this.currencyForm.value)
  }

  currencyChangedTo(event) {
    this.currencyToName = event.value.name;
    this.calculate(this.currencyForm.value)
  }

  currencyAmountFrom() {
    this.calculate(this.currencyForm.value)
  }

  calculate(data) {
    this.amountTo = data.amountFrom / data.currencyFrom.value * data.currencyTo.value
  }

  swapCurrencies() {
    const currencyFrom = this.currencyForm.value.currencyFrom;
    const currencyTo = this.currencyForm.value.currencyTo;

    this.currencyFromName = this.currencyForm.value.currencyTo.name;
    this.currencyToName = this.currencyForm.value.currencyFrom.name;

    this.currencyForm.patchValue({
      currencyFrom: currencyTo,
      currencyTo: currencyFrom
    })
    this.calculate(this.currencyForm.value)
  }
}
