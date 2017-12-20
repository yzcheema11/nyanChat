import { Component, OnInit, ViewChild} from '@angular/core';
import {MessagesService} from '../services/messages.service';
import {Message} from '../models/message.model';
import {MessageComponent} from '../message/message.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_URL} from '../../environments/environment';


@Component({
  selector: 'app-active-chat',
  templateUrl: './active-chat.component.html',
  styleUrls: ['./active-chat.component.css'],
})

export class ActiveChatComponent implements OnInit {

  @ViewChild(MessageComponent) child;

  private postsUrl = API_URL + '/posts';
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

  constructor(private messagesService: MessagesService, private http: HttpClient) {
  }

  ngOnInit() {
    this.messagesService.currentMessage.subscribe(message => this.display(message));
    setInterval(() => {

    //   this.getPosts.subscribe(next => {
    //     const tempMessages: Message[] = [];
    //     for (let x in next) {
    //       tempMessages.push(new Message(next[x]));
    //       console.log(next[x]);
    //     }
    //     this.chatMessages = tempMessages;
    //   });
    // }, 5000);
      this.chatMessages = this.messagesService.getAllMessages();
    }, 500);
  }
}
