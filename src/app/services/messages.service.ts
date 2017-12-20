import {Injectable} from '@angular/core';
import {Message} from '../models/message.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_URL} from '../../environments/environment';

declare let EventSource: any;

@Injectable()
export class MessagesService {

  messages: Message [] = [];
  private messagesUrl = API_URL + '/messages';

  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};


  messageSource = new BehaviorSubject<Message>(new Message({
    messageId: 0,
    timestamp: 'Admin Message',
    content: 'Welcome to NyanChat'
  }));
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) {
  }

  postMessage(message: Message): MessagesService {
    this.http.post(this.messagesUrl, message, this.httpOptions).toPromise().catch(reason => console.log(reason.toString()));
    return this;
  }

  getAllMessages(): Message [] {
    const getMessages = this.http.get<Message[]>(this.messagesUrl);
    const tempMessages: Message[] = [];
    getMessages.subscribe(next => {
      for (const x in next) {
        const messageHolder: Message = new Message(next[x]);
        tempMessages.push(messageHolder);
        console.log(messageHolder);
        this.messageSource.next(messageHolder);
      }
    });
    this.messages = tempMessages;
    return this.messages;
  }

  getMessagesById(id: number): Message {
    return this.messages.filter(message => message.messageId === id).pop();
  }

  getMessagesByUserName(userName: string): Message {
    return this.messages.filter(message => message.userName === userName).pop();
  }

  deleteMessageById(id: number): MessagesService {
    this.messages = this.messages.filter(message => message.messageId !== id);
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

  activeChatListener(): void {
    const source = new EventSource(API_URL + '/mainChat/');
    source.addEventListener('message', message => {
      const post: Message = new Message(JSON.parse(message.data));
      this.messageSource.next(post);
    });
  }
}
