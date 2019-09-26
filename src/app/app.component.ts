import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { AppState } from './redux/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
title = 'currency-converter';
}
