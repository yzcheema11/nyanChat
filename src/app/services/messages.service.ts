import { Injectable } from '@angular/core';
import { Message } from '../message.model';
import {BehaviorSubject } from 'rxjs/BehaviorSubject';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {API_URL} from '../../environments/environment';

declare let EventSource:any;

@Injectable()
export class MessagesService {
  lastId= 0;

  private postsUrl = /*API_URL + /**/'/posts';

  httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  messages: Message[] = [];
  messageSource= new BehaviorSubject<Message>(new Message({postId: 0, timestamp: 'Admin Message', content: 'Welcome to NyanChat'}));
  currentMessage= this.messageSource.asObservable();


  constructor(private http: HttpClient ) {
  }


  connect(): void{
    const source = new EventSource('http://localhost:8080/posts/activeChat');
    source.addEventListener('message', message => {
      let post: Message= new Message( JSON.parse(message.data));
      console.log(post);

      this.postMessage(post);
    });
  }
  postMessage(message: Message): MessagesService {
    if (!message.postId) {
      message.postId = ++this.lastId;
    }
    this.messages.push(message);
    console.log('msg srv: ' + message.content);

    this.messageSource.next(message);


    // this.http.post(this.postsUrl, message, this.httpOptions).toPromise().catch(reason => console.log(reason.toString()));

    return this;
  }

  getAllMessages() {
    return this.messages;
  }

  getMessagesById(id: number): Message {
    return this.messages.filter(message => message.postId === id).pop();
  }

  getMessagesByUserName(userName: string): Message {
    return this.messages.filter(message => message.userName === userName).pop();
  }

  deleteMessageById(id: number): MessagesService {
    const message = this.getMessagesById(id);
    this.messages = this.messages.filter(message => message.postId !== id);

    this.http.delete(API_URL + '/' + message.postId, this.httpOptions).toPromise().catch(reason => console.log(reason.toString()));
    return this;
  }

  updateMessageById(id: number, values: Object = {}): Message {
    const message = this.getMessagesById(id);
    if (!message) {
      return null;
    }
    Object.assign(message, values);
    return message;
  }
}
