import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedOnEmptyDirective } from './directives/red-on-empty.directive';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent,
    RedOnEmptyDirective,
    
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [NavbarComponent,RedOnEmptyDirective,RouterModule]
})
export class SharedModule { }
