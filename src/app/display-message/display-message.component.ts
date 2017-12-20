import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {MessageService} from '../services/message.service';


@Component({
  selector: 'app-display-message',
  templateUrl: './display-message.component.html',
  styleUrls: ['./display-message.component.css']
})
export class DisplayMessageComponent implements OnInit {

  @Output() del: EventEmitter<number> = new EventEmitter();

  @Input() id: number;

  @Input() newMsg: string;

  collapsed: boolean = false;

  delete() {

    this.del.emit(this.id);
    this.messageService.deleteMessageById(this.id);
    console.log(this.messageService.getMessagesById(this.id));
    for (const m in this.messageService.getAllMessages()) {
      console.log(this.messageService.getAllMessages()[m] + ' all msgs');
    }
  }

  editMsg() {
    this.messageService.updateMessageById(this.id, {content: this.newMsg});
    for (const m in this.messageService.getAllMessages()) {
      console.log(this.messageService.getAllMessages()[m] + ' all msgs');
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
