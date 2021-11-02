import { Component, OnInit , Input} from '@angular/core';
import {Message} from '../../message.model';
import {ContactService} from 'src/app/contacts/contact.service'
import { Contact } from 'src/app/contacts/contact.model';

@Component({
  selector: 'cms-messsage-item',
  templateUrl: './messsage-item.component.html',
  styleUrls: ['./messsage-item.component.css']
})
export class MesssageItemComponent implements OnInit {

  @Input() message: Message;
  messageSender:string = 'Samyukta';


  constructor(private contactSl: ContactService) { }

  ngOnInit() {
    // const contact: Contact = this.contactSl.getContact(
    //   this.message.sender
    // );
    // this.messageSender = contact.name;
  }
  }

