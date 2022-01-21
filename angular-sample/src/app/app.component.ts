import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SampleService } from './shared/services/sample.service';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-sample';
  constructor(public sample:SampleService){}
  ngOnInit(): void {
    const baseURL = environment.apiDomain+"coffee/hot";
    this.sample.getApi(baseURL).subscribe(res => console.log(res));
  }
}
