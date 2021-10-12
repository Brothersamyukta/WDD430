import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subjectInput') subjectInput: ElementRef;
  @ViewChild('messageInput') messageInput: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = 'Brother Jackson';


  constructor() { }

  ngOnInit(){
  }

  onSendMessage() {
    const subject = this.subjectInput.nativeElement.value;
    const msgText = this.messageInput.nativeElement.value;
    const newMessage = new Message('1', subject, msgText, this.currentSender);

    this.addMessageEvent.emit(newMessage);

    this.onClear();
  }

  onClear() {
    this.subjectInput.nativeElement.value ='';
    this.messageInput.nativeElement.value ='';
  }

}
