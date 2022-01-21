import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { DatePickComponent } from './date-pick/date-pick.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectorComponent } from './multi-selector/multi-selector.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DatePickComponent,
    MultiSelectorComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,MaterialModule, AppRoutingModule,
    ReactiveFormsModule,FormsModule,
    BrowserAnimationsModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
