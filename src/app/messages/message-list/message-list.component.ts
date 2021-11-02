import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import {MessageService} from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})


export class MessageListComponent implements OnInit {
  messages: Message[];

  constructor(private msgSL: MessageService) { }

  ngOnInit() {
    this.messages = this.msgSL.getMessages();
    this.msgSL.messageChangedEvent.subscribe((message: Message[]) => {
      console.log(message)
      this.messages = message;
    })
  }

  // onAddMessage(message) {
  //   this.messages.push(message);
  // }
}
