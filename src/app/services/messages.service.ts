import {Injectable} from '@angular/core';
import {Message} from '../models/message.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_URL} from '../../environments/environment';

declare let EventSource: any;

@Injectable()
export class MessagesService {


  private messagesUrl = API_URL + '/messages';

  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  messages: Message[] = [];
  messageSource = new BehaviorSubject<Message>(new Message({
    messageId: 0,
    timestamp: 'Admin Message',
    content: 'Welcome to NyanChat'
  }));
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) {
  }

  postMessage(message: Message): MessagesService {
    this.messages.push(message);
//    this.messageSource.next(message);
    this.http.post(this.messagesUrl, message, this.httpOptions).toPromise().catch(reason => console.log(reason.toString()));
    return this;
  }

  getAllMessages() {
    const getMessages = this.http.get<Message[]>(this.messagesUrl);
    getMessages.subscribe(next => {
      const tempMessages: Message[] = [];
      for (const x in next) {
        tempMessages.push(new Message(next[x]));
        console.log(next[x]);
      }
      this.messages = tempMessages;
    });
    return this.messages;
  }

  getMessageById(id: number): Message {
    const getMessage = this.http.get<Message>(this.messagesUrl + '/{{messageId}}');
    let returnMessage: Message;
    // getMessages.subscribe(next => {
    //   const tempMessages: Message[] = [];
    //   for (const x in next) {
    //     tempMessages.push(new Message(next[x]));
    //     console.log(next[x]);
    //   }
    //   this.messages = tempMessages;
    // });
    getMessage.subscribe(next => {
      returnMessage = new Message(next);
    });
    return returnMessage;
  }

  getMessagesByUserName(userName: string): Message {
    return this.messages.filter(message => message.userName === userName).pop();
  }

  deleteMessageById(id: number): MessagesService {
    this.messages = this.messages.filter(message => message.messageId !== id);
    return this;
  }

  updateMessageById(id: number, values: Object = {}): Message {
    const message = this.getMessageById(id);
    if (!message) {
      return null;
    }
    Object.assign(message, values);
    return message;
  }

  activeChatListener(): void {
    const source = new EventSource(API_URL + '/mainChat/');
    source.addEventListener('message', message => {
      let post: Message = new Message(JSON.parse(message.data));
      this.messageSource.next(post);
    });
  }
}
