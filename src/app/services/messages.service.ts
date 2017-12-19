import { Injectable } from '@angular/core';
import { Message } from '../message.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable()
export class MessagesService {
  lastId= 0;


  messages: Message[] = [];
  messageSource= new BehaviorSubject<Message>(new Message({userName: 'Admin', body: 'Welcome to NyanChat'}));
  currentMessage= this.messageSource.asObservable();
  constructor(private http: Http) {
  }

  postMessage(message: Message): MessagesService {
    if (!message.id) {
      message.id = ++this.lastId;
    }
    this.messages.push(message);
    console.log('msg srv: ' + message.body);
    this.messageSource.next(message);
    return this;
  }

  // getAllMessages() {
  //   return this.messages;
  // }

  getAllMessages() : Observable<Message[]> {
    return this.http.get('http://localhost:4200/api/posts').map((res:Response) => res.json());
  }

  getMessagesById(id: number): Message {
    return this.messages.filter(message => message.id === id).pop();
  }

  getMessagesByUserName(userName: string): Message {
    return this.messages.filter(message => message.userName === userName).pop();
  }

  deleteMessageById(id: number): MessagesService {
    this.messages = this.messages.filter(message => message.id !== id);
    return this;
  }

  updateMessageById(id: number, values: Object = {}): Message {
    let message = this.getMessagesById(id);
    if (!message) {
      return null;
    }
    Object.assign(message, values);
    return message;
  }
}
