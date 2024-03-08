import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedOnEmptyDirective } from './directives/red-on-empty.directive';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    NavbarComponent,
    RedOnEmptyDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [NavbarComponent,RedOnEmptyDirective]
})
export class SharedModule { }
