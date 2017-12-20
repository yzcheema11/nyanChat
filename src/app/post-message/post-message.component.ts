import {Component, Input, OnInit} from '@angular/core';
import { MessageService } from '../services/message.service';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-post-message',
  templateUrl: './post-message.component.html',
  styleUrls: ['./post-message.component.css']
})
export class PostMessageComponent implements OnInit {

  str= '';

  @Input()
  logMsg() {
    if(this.str.length > 0) {

      const temp = new Message({userId: 1, content: this.str});
      console.log(temp)
      this.messageService.postMessage(temp);
      this.str = '';
    }
  }

  constructor(private messageService: MessageService) {}


  ngOnInit() {
  }
}
