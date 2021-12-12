import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
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
  currentSender: Contact;


  constructor(
      private messageService: MessageService,
      private contactService: ContactService  
    ) { }

  ngOnInit(){
    this.contactService.getContact('1').subscribe(contactData => {
      this.currentSender = contactData.contact;
    });
  }

  onSendMessage() {
    const subject = this.subjectInput.nativeElement.value;
    const msgText = this.messageInput.nativeElement.value;
    const newMessage = new Message(5, subject, msgText, this.currentSender);
    this.messageService.addMessage(newMessage);

    this.onClear();
  }

  onClear() {
    this.subjectInput.nativeElement.value ='';
    this.messageInput.nativeElement.value ='';
  }

}
