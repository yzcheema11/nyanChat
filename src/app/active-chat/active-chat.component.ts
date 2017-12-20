import {Component, OnInit, ViewChild} from '@angular/core';
import {MessageService} from '../services/message.service';
import {Message} from '../models/message.model';
import {DisplayMessageComponent} from '../display-message/display-message.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_URL} from "../../environments/environment";


@Component({
  selector: 'app-active-chat',
  templateUrl: './active-chat.component.html',
  styleUrls: ['./active-chat.component.css'],
})

export class ActiveChatComponent implements OnInit {

  @ViewChild(DisplayMessageComponent) child;

  private messagesUrl = API_URL + '/messages';
  chatMessages: Message[] = [];

  mesgId: number;

  display(message: Message) {
    this.mesgId = message.messageId;
    console.log(message);
    this.chatMessages.push(message);
  }

  onDelete(id: number) {
    console.log(id);
    this.chatMessages = this.chatMessages.filter(message => message.messageId !== id);
  }

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  ngOnInit() {
    this.messagesService.getAllMessages();
    this.messagesService.currentMessage.subscribe(message => this.display(message));
    this.messagesService.activeChatListener();
  }
}
