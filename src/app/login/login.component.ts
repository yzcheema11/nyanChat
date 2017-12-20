import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() userName: string;

  @Input() password: string;

  constructor() { }

  ngOnInit() {
  }

}
