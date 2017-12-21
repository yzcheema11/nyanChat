import {Injectable} from '@angular/core';
import {Message} from '../models/message.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_URL} from '../../environments/environment';


declare let EventSource: any;

@Injectable()
export class MessageService {

  // messages: Message [] = [];
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

  postMessage(message: Message): MessageService {

    // this.messages.push(message);
    this.http.post(this.messagesUrl, message, this.httpOptions).toPromise().catch(reason => console.log(reason.toString()));
    return this;
  }

  getAllMessages(): Message [] {
    const getMessages = this.http.get<Message[]>(this.messagesUrl);
    const tempMessages: Message[] = [];
    getMessages.subscribe(next => {
      for (const x of next) {
        const messageHolder: Message = new Message(x);
        tempMessages.push(messageHolder);
        this.messageSource.next(messageHolder);
      }
    });
    // this.messages = tempMessages;
    return tempMessages;
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


  deleteMessageById(id: number): MessageService {
    // this.messages = this.messages.filter(message => message.messageId !== id);
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
      const post: Message = new Message(JSON.parse(message.data));
      this.messageSource.next(post);
    });
  }
}
