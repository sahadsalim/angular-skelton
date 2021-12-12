import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,MatGridListModule,MatCardModule,MatSliderModule,
  ],
  exports:[
    MatGridListModule,MatCardModule,MatSliderModule
  ]
})
export class MaterialModule { }
