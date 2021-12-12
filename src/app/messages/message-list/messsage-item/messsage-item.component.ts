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
  messageSender: string;


  constructor(private contactService: ContactService) { }

  ngOnInit() {
    try {
      this.contactService.getContact(this.message.sender.id).subscribe(contactData => {
        this.messageSender = contactData.contact.name;
      });
      
      // console.log(this.message.sender)
      // console.log("this was sender")
      // console.log(sender)
      // this.messageSender = sender?.name;
    }
    catch{
      //this.messageSender = 'I was here'
    }
    // this.messageSender = this.message.sender?.name;    
  }
  }

