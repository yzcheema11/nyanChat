import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {MessagesService} from '../services/messages.service';
import {Message} from '../models/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Output() del: EventEmitter<number> = new EventEmitter();

  @Input() message: Message;

  @Input() newMsg: string;

  collapsed: boolean = false;

  delete() {
    this.del.emit(this.message.messageId);
    this.messagesService.deleteMessageById(this.message.messageId);
    console.log(this.messagesService.getMessageById(this.message.messageId));
    for (const m in this.messagesService.getAllMessages()) {
      console.log(this.messagesService.getAllMessages()[m] + ' all msgs');
    }
  }

  editMsg() {
    this.messagesService.updateMessageById(this.message.messageId, {content: this.newMsg});
    for (const m in this.messagesService.getAllMessages()) {
      console.log(this.messagesService.getAllMessages()[m] + ' all msgs');
    }
  }

  constructor(private messagesService: MessagesService) {

  }

  toggleOptionsMenu() {

    this.collapsed = !this.collapsed;
    // let ele = document.getElementById('optionmenu');
    // if (ele.style.display === 'block') {
    //   ele.style.display = 'none';
    // }
    // else {
    //   ele.style.display = 'block';
    // }
  }

  ngOnInit() {
  }

}
