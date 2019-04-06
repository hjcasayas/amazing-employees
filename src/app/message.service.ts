import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  recentMessage: string;

  logMessage(message: string) {
    this.recentMessage = message;
    console.log(this.recentMessage);
  }

}
