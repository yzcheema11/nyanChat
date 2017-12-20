import {Injectable} from '@angular/core';
import {Message} from '../models/message.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {API_URL} from "../../environments/environment";

@Injectable()
export class MessagesService {
  lastId = 0;

  private postsUrl = API_URL + '/posts';

  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  messages: Message[] = [];
  messageSource = new BehaviorSubject<Message>(new Message({
    postId: 0,
    timestamp: 'Admin Message',
    content: 'Welcome to NyanChat'
  }));
  currentMessage = this.messageSource.asObservable();


  constructor(private http: HttpClient) {
  }

  postMessage(message: Message): MessagesService {
    if (!message.postId) {
      message.postId = ++this.lastId;
    }
    this.messages.push(message);
    console.log('msg srv: ' + message.content);

    this.messageSource.next(message);

    this.http.post(this.postsUrl, message, this.httpOptions).toPromise().catch(reason => console.log(reason.toString()));

    return this;
  }

  getAllMessages() {
    const getPosts = this.http.get<Message[]>(this.postsUrl);
    getPosts.subscribe(next => {
      const tempMessages: Message[] = [];
      for (const x in next) {
        tempMessages.push(new Message(next[x]));
        console.log(next[x]);
      }
      this.messages = tempMessages;
    });
    return this.messages;
  }

  getMessagesById(id: number): Message {
    return this.messages.filter(message => message.postId === id).pop();
  }

  getMessagesByUserName(userName: string): Message {
    return this.messages.filter(message => message.userName === userName).pop();
  }

  deleteMessageById(id: number): MessagesService {
    this.messages = this.messages.filter(message => message.postId !== id);
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
