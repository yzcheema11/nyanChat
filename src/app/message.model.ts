export class Message {

  id: number;
  userName: string;
  body: string;
  date: string = new Date().toLocaleDateString();

  constructor(values: Object= {}) {
    Object.assign(this, values);
  }

  toString(): string {
    return this.userName +' '+ this.date+': ' + this.body;
  }
}
