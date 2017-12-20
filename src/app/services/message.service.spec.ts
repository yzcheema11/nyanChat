import {TestBed, inject} from '@angular/core/testing';
import {Message} from '../models/message.model';
import {MessagesService} from './message.service';
import {HttpClientModule} from '@angular/common/http';

describe('MessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessagesService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([MessagesService], (service: MessagesService) => {
    expect(service).toBeTruthy();
  }));

  describe('updateBehaviorSubject', () => {
    it('should update currentMessage', inject([MessagesService], (service: MessagesService) => {
      const message1 = new Message({
        userName: 'mario',
        content: 'its a me'
      });
      const message2 = new Message({
        userName: 'luigi',
        content: 'luigi?'
      });
      service.postMessage(message1);
      service.postMessage(message2);
      expect(service.messageSource.getValue()).toEqual(message2);
    }));
  });
  describe('getAllMessages()', () => {
    it('should return empty array', inject([MessagesService], (service: MessagesService) => {
      expect(service.getAllMessages()).toEqual([]);
    }));
    it('should return an empty array by default', inject([MessagesService], (service: MessagesService) => {
      expect(service.getAllMessages()).toEqual([]);
    }));

    it('should return all messages', inject([MessagesService], (service: MessagesService) => {
      const message1 = new Message({
        userName: 'mario',
        content: 'its a me'
      });
      const message2 = new Message({
        userName: 'luigi',
        content: 'luigi?'
      });
      service.postMessage(message1);
      service.postMessage(message2);
      expect(service.getAllMessages()).toEqual([message1, message2]);
    }));

    it('should get message by username', inject([MessagesService], (service: MessagesService) => {
      const message1 = new Message({
        userName: 'DK',
        content: 'yummy bananas'
      });
      const message2 = new Message({
        userName: 'diddy',
        content: 'mellow yellow bananas'
      });
      service.postMessage(message1);
      service.postMessage(message2);
      expect(service.getMessagesByUserName('DK')).toEqual(message1);
      expect(service.getMessagesByUserName('diddy')).toEqual(message2);
    }));
  });

  describe('#postMessage', () => {

    it('should automatically add id', inject([MessagesService], (service: MessagesService) => {
      const message1 = new Message({
        userName: 'DK',
        content: 'yummy bananas'
      });
      const message2 = new Message({
        userName: 'diddy',
        content: 'mellow yellow bananas'
      });
      service.postMessage(message1);
      service.postMessage(message2);
      expect(service.getMessageById(1)).toEqual(message1);
      expect(service.getMessageById(2)).toEqual(message2);
    }));
  });

  describe('#delete', () => {
    it('should remove message by id', inject([MessagesService], (service: MessagesService) => {
      const message1 = new Message({
        userName: 'toad',
        content: 'the princess is in another castle'
      });
      const message2 = new Message({
        userName: 'mario',
        content: 'i hate you'
      });
      service.postMessage(message1);
      service.postMessage(message2);
      expect(service.getAllMessages()).toEqual([message1, message2]);
      service.deleteMessageById(2);
      expect(service.getAllMessages()).toEqual([message1]);
      service.deleteMessageById(1);
      expect(service.getAllMessages()).toEqual([]);
    }));

    it('should remove nothing if no id found', inject([MessagesService], (service: MessagesService) => {
      const message1 = new Message({
        userName: 'bowser',
        content: 'bwahahaha'
      });
      const message2 = new Message({
        userName: 'luigi',
        content: 'oh noooo'
      });
      service.postMessage(message1);
      service.postMessage(message2);
      expect(service.getAllMessages()).toEqual([message1, message2]);
      service.deleteMessageById(3);
      expect(service.getAllMessages()).toEqual([message1, message2]);
    }));
  });

  describe('#updateMessage', () => {
    it('should update the message', inject([MessagesService], (service: MessagesService) => {
      const message1 = new Message({
        userName: 'mario',
        content: 'its a me'
      });
      service.postMessage(message1);
      service.updateMessageById(1, {content: 'pasta, pasta, pasta'});
      expect(message1.content).toEqual('pasta, pasta, pasta');
    }));

    it('should return null if no id found', inject([MessagesService], (service: MessagesService) => {
      const message1 = new Message({
        userName: 'mario',
        content: 'its a me'
      });
      service.postMessage(message1);
      const updated: Message = service.updateMessageById(2, {content: 'where\'s the message?'});
      expect(updated).toEqual(null);
    }));
  });
});
