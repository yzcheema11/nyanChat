export class Message {

  id: number;
  userName: string;
  body: string;
  date: Date = new Date();

  constructor(values: Object= {}) {
    Object.assign(this, values);
  }

  toString(): string {
    return this.userName + ': ' + this.body;
  }
}
