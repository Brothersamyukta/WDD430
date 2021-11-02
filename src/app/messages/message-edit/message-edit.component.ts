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
  currentSender = '1';


  constructor(private messageService: MessageService) { }

  ngOnInit(){
  }

  onSendMessage() {
    const subject = this.subjectInput.nativeElement.value;
    const msgText = this.messageInput.nativeElement.value;
    const newMessage = new Message('5', subject, msgText, this.currentSender);
    this.messageService.addMessage(newMessage);


    this.onClear();
  }

  onClear() {
    this.subjectInput.nativeElement.value ='';
    this.messageInput.nativeElement.value ='';
  }

}
