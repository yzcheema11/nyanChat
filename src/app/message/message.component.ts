import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { MessagesService} from '../services/messages.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Output() del: EventEmitter<number> = new EventEmitter();

  @Input() id: number;

  @Input() newMsg: string;

  delete() {

    this.del.emit(this.id);
    this.messagesService.deleteMessageById(this.id);
    console.log(this.messagesService.getMessagesById(this.id));
    for (const m in this.messagesService.getAllMessages()) {
      console.log(this.messagesService.getAllMessages()[m] + ' all msgs');
    }
  }

  editMsg() {
    this.messagesService.updateMessageById(this.id, {content: this.newMsg});
    for (const m in this.messagesService.getAllMessages()) {
      console.log(this.messagesService.getAllMessages()[m] + ' all msgs');
    }
  }

  constructor(private messagesService: MessagesService) {

  }


  ngOnInit() {
  }

}
