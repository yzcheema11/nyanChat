import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {MessageService} from '../services/message.service';
import {Message} from '../models/message.model';


@Component({
  selector: 'app-display-message',
  templateUrl: './display-message.component.html',
  styleUrls: ['./display-message.component.css']
})
export class DisplayMessageComponent implements OnInit {

  @Output() updateMsg: EventEmitter<Object> = new EventEmitter();

  @Input() id: number;

  @Input() newMsg: string;

  @Input() incomingMessage: Message;

  collapsed = false;

  delete() {

    this.updateMsg.emit({messageId: this.id, content: this.newMsg, flag: 'D'});
    this.messageService.deleteMessageById(this.id);
  }

  editMsg() {
    if (this.newMsg.length > 0) {
      this.messageService.updateMessageById(this.id, {content: this.newMsg});
      this.updateMsg.emit({messageId: this.id, content: this.newMsg, flag: 'E'});
      this.newMsg = '';
    }
  }

  constructor(private messageService: MessageService) {

  }

  toggleOptionsMenu() {

    this.collapsed = !this.collapsed;
  }

  ngOnInit() {
  }

}
