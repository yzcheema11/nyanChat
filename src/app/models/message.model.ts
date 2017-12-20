export class Message {

  // get userName(): string {
  //   return this._userName;
  // }
  //
  // set userName(value: string) {
  //   this._userName = value;
  // }
  //
  // get postId(): number {
  //   return this._postId;
  // }
  //
  // set postId(value: number) {
  //   this._postId = value;
  // }
  //
  // get content(): string {
  //   return this._content;
  // }
  //
  // set content(value: string) {
  //   this._content = value;
  // }
  //
  // get threadId(): number {
  //   return this._threadId;
  // }
  //
  // set threadId(value: number) {
  //   this._threadId = value;
  // }
  //
  // get userId(): number {
  //   return this._userId;
  // }
  //
  // set userId(value: number) {
  //   this._userId = value;
  // }
  //
  // get timeStamp(): string {
  //   return this._timeStamp;
  // }
  //
  // set timeStamp(value: string) {
  //   this._timeStamp = value;
  // }
  //
  // get editedTime(): string {
  //   return this._editedTime;
  // }
  //
  // set editedTime(value: string) {
  //   this._editedTime = value;
  // }
  //
  //
  // private _userName: string;


  postId: number;
  userId: number;
  threadId: number;
  timestamp: string;// = new Date().toLocaleDateString();
  content: string;
  editedTime:string;
  userName:string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  toString(): string {
    return this.userName + ' ' + this.timestamp + ': ' + this.content;
  }
}
