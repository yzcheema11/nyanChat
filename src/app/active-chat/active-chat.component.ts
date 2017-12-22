import {Component, OnInit, ViewChild, AfterViewChecked, ElementRef} from '@angular/core';
import {MessageService} from '../services/message.service';
import {Message} from '../models/message.model';
import {DisplayMessageComponent} from '../display-message/display-message.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {API_URL} from '../../environments/environment';


@Component({
  selector: 'app-active-chat',
  templateUrl: './active-chat.component.html',
  styleUrls: ['./active-chat.component.css'],
})

export class ActiveChatComponent implements OnInit, AfterViewChecked {

  @ViewChild(DisplayMessageComponent) child;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  private messageUrl = API_URL + '/messages';
  chatMessages: Message[] = [];

  mesgId: number;

  display(message: Message) {
    this.mesgId = message.messageId;
    console.log(message);
    this.chatMessages.push(message);
  }

  onUpdate(messageUpdate: {}) {
    console.log(messageUpdate['messageId']);
    if (messageUpdate['content'] == undefined){
      this.chatMessages = this.chatMessages.filter(message => message.messageId !== messageUpdate['messageId']);
    }
    else {
      this.chatMessages.find(msg => msg.messageId == messageUpdate['messageId']).content = messageUpdate['content'];
    }
  }

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  ngOnInit() {
    this.messageService.getAllMessages();
    this.messageService.currentMessage.subscribe(message => this.display(message));
    this.messageService.activeChatListener();
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }
}
