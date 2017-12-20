import {Component, Input, OnInit} from '@angular/core';
import { MessagesService } from '../services/messages.service';
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
      const temp = new Message({userName: 'Enter a Name in Model', content: this.str});
      this.messagesService.postMessage(temp);
      this.str = '';
    }
  }

  constructor(private messagesService: MessagesService) {}


  ngOnInit() {
  }
}
