import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  public conctactSelectedEvent = new EventEmitter<Contact>();

  private contacts: Contact[] = [];
  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts
      .sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      })
      .slice();
  }

  getContact(id: String): Contact {
    return this.contacts.find((contact) => contact.id === id);
  }
}