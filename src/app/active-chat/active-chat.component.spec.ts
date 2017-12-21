import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {ActiveChatComponent} from './active-chat.component';
import {DisplayMessageComponent} from '../display-message/display-message.component';
import {MessageService} from '../services/message.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Message} from '../models/message.model';


describe('ActiveChatComponent', () => {
  let component: ActiveChatComponent;
  let fixture: ComponentFixture<ActiveChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveChatComponent, DisplayMessageComponent],
      providers: [MessageService],
      imports: [FormsModule, ReactiveFormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInIt subscribes to new Messages', () => {
    it('should start with a welcome message', inject([MessageService], (service: MessageService) => {
      const message1 = new Message({userName: 'Admin', body: 'Welcome to NyanChat'});
      let subscription: Message;
      service.currentMessage.subscribe(message => subscription = message);
      expect(subscription).toEqual(message1);
    }));

    it('should update with ', inject([MessageService], (service: MessageService) => {
      const message1 = new Message({userName: 'Test', body: 'Subscribed?'});
      service.postMessage(message1);
      let subscription: Message;
      service.currentMessage.subscribe(message => subscription = message);
      expect(subscription).toEqual(message1);
    }));
  });
});
