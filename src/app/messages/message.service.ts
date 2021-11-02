import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();

  public message: Message[];

  constructor() {
    this.message = MOCKMESSAGES;
  }

  addMessage(message: Message) {
    this.message.push(message);
    this.messageChangedEvent.emit(this.message.slice());
  }

  getMessage(id: string): Message {
    return this.message.find((message) => message.id === id);
  }
  
  getMessages(): Message[] {
    return this.message.slice();
  }

  
}