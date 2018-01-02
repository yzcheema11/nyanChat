import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordofthedayComponent } from './wordoftheday.component';
import { WordofthedayService } from './wordoftheday.service';
import { Wordoftheday } from './wordoftheday';

@NgModule({
  imports: [
    CommonModule,
    Wordoftheday
  ],
  declarations: [WordofthedayComponent],
  providers: [WordofthedayService]
})
export class WordofthedayModule { }
