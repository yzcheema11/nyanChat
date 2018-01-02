import { Component, OnInit } from '@angular/core';
import { WordofthedayService } from './wordoftheday.service';

@Component({
  selector: 'app-wordoftheday',
  templateUrl: './wordoftheday.component.html',
  styleUrls: ['./wordoftheday.component.css']
})
export class WordofthedayComponent implements OnInit {

  constructor(private wordOfTheDayService: WordOfTheDayService) { }

  ngOnInit() {
  }

}
