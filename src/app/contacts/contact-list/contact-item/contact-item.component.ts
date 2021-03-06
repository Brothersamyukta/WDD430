import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../../contact.model';
import {ContactService} from '../../contact.service'

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input() item: Contact;
  
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
  }

  // onSelect()
  // {
  //   this.contactService.conctactSelectedEvent.emit(this.item)
  // }

}
