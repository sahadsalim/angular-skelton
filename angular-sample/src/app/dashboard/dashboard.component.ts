import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  selectedLanguages = [5,6];
  dataArray = [
    {
      langName: 'en',
      langId: 1,
    },
    {
      langName: 'es',
      langId: 2,
    },
    {
      langName: 'fr',
      langId: 3,
    },
    {
      langName: 'en',
      langId: 4,
    },
    {
      langName: 'pr',
      langId: 5,
    },
    {
      langName: 'ml',
      langId: 6,
    },
    {
      langName: 'en',
      langId: 7,
    },
    {
      langName: 'es',
      langId: 8,
    },
    {
      langName: 'fr',
      langId: 9,
    },
  ];
  onLanguageSelect(evt: any) {
    let isExist=this.selectedLanguages.find(m=>m===evt.langId)
    if(!isExist && evt.langId)this.selectedLanguages.push(evt.langId);
  }

  ngOnInit(): void {
  }

}
