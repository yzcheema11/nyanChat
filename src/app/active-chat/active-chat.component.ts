import {Component, OnInit, ViewChild} from '@angular/core';
import {MessagesService} from '../services/messages.service';
import {Message} from '../message.model';
import {MessageComponent} from '../message/message.component';

@Component({
  selector: 'app-active-chat',
  templateUrl: './active-chat.component.html',
  styleUrls: ['./active-chat.component.css'],
})

export class ActiveChatComponent implements OnInit {

  @ViewChild(MessageComponent) child;

  chatMessages: Message[]= [];

  mesgId: number;

  display(message: Message) {
    this.mesgId = message.id;
    console.log(message);
    this.chatMessages.push(message);
  }

  onDelete(id: number) {
    console.log(id);
    this.chatMessages = this.chatMessages.filter(message => message.id !== id);
  }
  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
    this.messagesService.currentMessage.subscribe(message => this.display(message));
  }

}
