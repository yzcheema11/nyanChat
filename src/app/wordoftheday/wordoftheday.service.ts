import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WordofthedayService {

  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};  

  private wotdURL = 'http://api.wordnik.com:80/v4/words.json/wordOfTheDay?date=';
  private wotdAPIkey = '&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';

  constructor(private http: HttpClient) { }

}


@Injectable()
export class MessagesService {

  private messagesUrl = API_URL + '/messages';

  messages: Message[] = [];
  messageSource = new BehaviorSubject<Message>(new Message({
    messageId: 0,
    timestamp: 'Admin Message',
    content: 'Welcome to NyanChat'
  }));
  currentMessage = this.messageSource.asObservable();


  constructor(private http: HttpClient) {
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
}
