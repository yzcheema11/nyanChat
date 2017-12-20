export class Message {

  messageId: number;
  userId: number;
  threadId: number;
  timestamp: string;// = new Date().toLocaleDateString();
  content: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  toString(): string {
    return this.userId + ' ' + this.timestamp + ': ' + this.content;
  }
}
