import {Component, OnInit, ViewChild} from '@angular/core';
import {MessagesService} from '../services/messages.service';
import {Message} from '../message.model';
import {MessageComponent} from '../message/message.component';
import {HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-active-chat',
  templateUrl: './active-chat.component.html',
  styleUrls: ['./active-chat.component.css'],
})

export class ActiveChatComponent implements OnInit {

  @ViewChild(MessageComponent) child;

  private postsUrl = 'https://nameless-peak-71330.herokuapp.com/posts';
  chatMessages: Message[]= [];

  mesgId: number;
  getPosts = this.http.get<Message[]>(this.postsUrl);

  display(message: Message) {
    this.mesgId = message.postId;
    console.log(message);
    this.chatMessages.push(message);
  }

  onDelete(id: number) {
    console.log(id);
    this.chatMessages = this.chatMessages.filter(message => message.postId !== id);
  }

  constructor(private messagesService: MessagesService, private http: HttpClient) { }

  ngOnInit() {
    this.messagesService.currentMessage.subscribe(message => this.display(message));
    // this.getPosts.subscribe(next => this.chatMessages = next);
    this.getPosts.subscribe(next => {
      for (const x in next) {
        this.chatMessages.push(new Message(next[x]));
        console.log(next[x]);
      }
    });
  }

}
