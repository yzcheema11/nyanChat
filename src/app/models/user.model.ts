export class User {

  userId: number;
  userName: string;
  password: string;
  // status: string;
  // color: any;

  constructor(values: Object = {}) {
    Object.assign(values);
  }

  toString(): string {
    return this.userName + ': ' + this.userId;
  }

}
