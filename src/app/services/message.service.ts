import {Injectable} from '@angular/core';
import {Message} from '../models/message.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_URL} from '../../environments/environment';
import {promise} from 'selenium-webdriver';


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

  postMessage(message: Message) {

    this.http.post(this.messagesUrl, message, this.httpOptions).toPromise()
      .then(() => console.log('PSOT Sent'))
      .catch(() => console.log('POST failed'));
  }

  getAllMessages(): Message [] {
    console.log('getting all');
    const getMessages = this.http.get<Message[]>(this.messagesUrl);
    const tempMessages: Message[] = [];
    getMessages.subscribe(next => {
      for (const x of next) {
        const messageHolder: Message = new Message(x);
        tempMessages.push(messageHolder);
        this.messageSource.next(messageHolder);
      }
    });
    return tempMessages;
  }

  getMessageById(id: number): Message {
    const returnMessage: Message = new Message;
    console.log(id);
    this.http.get<Message>(this.messagesUrl + '/' + id).subscribe(msg => Object.assign(returnMessage, msg));
    return returnMessage;
  }

  temp(msg) {
    console.log(msg);
  }

  deleteMessageById(id: number) {
    this.http.delete(this.messagesUrl + '/' + id).toPromise()
      .then(() => console.log('deleted'))
      .catch(() => console.log('failed to delete'));
  }

  updateMessageById(id: number, values: Object = {}) {
    const message: Message = this.getMessageById(id);
    Object.assign(message, values);
    this.http.put(this.messagesUrl + '/' + id, message).toPromise()
      .then(() => console.log('updated'))
      .catch(() => console.log('failed to update'));
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
