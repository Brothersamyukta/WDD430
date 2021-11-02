import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import {MessageService} from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subjectInput') subjectInput: ElementRef;
  @ViewChild('messageInput') messageInput: ElementRef;

  currentSender = 'Samyukta';


  constructor(private msgService: MessageService) { }

  ngOnInit(){
  }

  onSendMessage() {
    const subject = this.subjectInput.nativeElement.value;
    console.log(subject)
    const msgText = this.messageInput.nativeElement.value;
    console.log(msgText)
    const newMessage = new Message('5', subject, msgText, this.currentSender);

    this.msgService.addMessage(newMessage);


    this.onClear();
  }

  onClear() {
    this.subjectInput.nativeElement.value ='';
    this.messageInput.nativeElement.value ='';
  }

}
