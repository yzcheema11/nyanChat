import {TestBed, inject} from '@angular/core/testing';
import {Message} from '../message.model';
import {MessagesService} from './messages.service';

describe('MessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessagesService]
    });
  });

  it('should be created', inject([MessagesService], (service: MessagesService) => {
    expect(service).toBeTruthy();
  }));

  describe('updateBehaviorSubject', () => {
    it('should update currentMessage', inject([MessagesService], (service: MessagesService) => {
      const message1 = new Message({
        userName: 'mario',
        body: 'its a me'
      });
      const message2 = new Message({
        userName: 'luigi',
        body: 'luigi?'
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
        body: 'its a me'
      });
      const message2 = new Message({
        userName: 'luigi',
        body: 'luigi?'
      });
      service.postMessage(message1);
      service.postMessage(message2);
      expect(service.getAllMessages()).toEqual([message1, message2]);
    }));

    it('should get message by username', inject([MessagesService], (service: MessagesService) => {
      const message1 = new Message({
        userName: 'DK',
        body: 'yummy bananas'
      });
      const message2 = new Message({
        userName: 'diddy',
        body: 'mellow yellow bananas'
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
        body: 'yummy bananas'
      });
      const message2 = new Message({
        userName: 'diddy',
        body: 'mellow yellow bananas'
      });
      service.postMessage(message1);
      service.postMessage(message2);
      expect(service.getMessagesById(1)).toEqual(message1);
      expect(service.getMessagesById(2)).toEqual(message2);
    }));
  });

  describe('#delete', () => {
    it('should remove message by id', inject([MessagesService], (service: MessagesService) => {
      const message1 = new Message({
        userName: 'toad',
        body: 'the princess is in another castle'
      });
      const message2 = new Message({
        userName: 'mario',
        body: 'i hate you'
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
        body: 'bwahahaha'
      });
      const message2 = new Message({
        userName: 'luigi',
        body: 'oh noooo'
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
        body: 'its a me'
      });
      service.postMessage(message1);
      service.updateMessageById(1, {body: 'pasta, pasta, pasta'});
      expect(message1.body).toEqual('pasta, pasta, pasta');
    }));

    it('should return null if no id found', inject([MessagesService], (service: MessagesService) => {
      const message1 = new Message({
        userName: 'mario',
        body: 'its a me'
      });
      service.postMessage(message1);
      const updated: Message = service.updateMessageById(2, {body: 'where\'s the message?'});
      expect(updated).toEqual(null);
    }));
  });
});
