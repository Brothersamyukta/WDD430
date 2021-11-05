import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';
import {ContactService} from '../contact.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[]

  constructor(private contactSerivce: ContactService, private route:ActivatedRoute, private router: Router) { }

  
  ngOnInit() {
    this.contacts = this.contactSerivce.getContacts();
    
    this.contactSerivce.conctactSelectedEvent.subscribe((contact: Contact[]) => {
      this.contacts = contact;
    });
  }

  onCreateContact()
  {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  

}
