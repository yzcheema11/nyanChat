export class User {

  userId: number;
  userName: string;
  password: string;

  constructor(values: Object = {}) {
    Object.assign(values);
  }

  toString(): string {
    return this.userName + ': ' + this.userId;
  }

}
