import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedOnEmptyDirective } from './directives/red-on-empty.directive';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [
    NavbarComponent,
    RedOnEmptyDirective,
    BarChartComponent,
    LineChartComponent,
    BarChartComponent
  ],
  imports: [
    
    CommonModule,
    RouterModule,
    ButtonModule, 
    InputTextModule 
     
  ],
  exports: [
    NavbarComponent,
    BarChartComponent,
    RedOnEmptyDirective,
    RouterModule, 
    ButtonModule, 
    InputTextModule 
  ]
})
export class SharedModule { }
