import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  public conctactSelectedEvent = new Subject<Contact[]>();
  public maxContactId: number;

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

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.conctactSelectedEvent.next(this.contacts.slice());
  }
  getMaxId(): number {
    let maxId = 0

    for (const contact of this.contacts){
      let currentId = parseInt(contact.id);

        if (currentId > maxId){
            maxId = currentId;
        }         
    }

  return maxId;
 }
 addContact(newContact: Contact) {
  if (!newContact) {
    return
  }

  this.maxContactId++
  newContact.id = this.maxContactId.toString();
  this.contacts.push(newContact);
  const documentsListClone = this.contacts.slice()
  this.conctactSelectedEvent.next(documentsListClone)
}
updateDocument(originalContact: Contact, newContact: Contact) {
  if (!(originalContact||newContact)) {
    return
  }
  
  const pos = this.contacts.indexOf(originalContact)
  if (pos < 0) {
    return
  }
    
  newContact.id = originalContact.id
  this.contacts[pos] = newContact
  const contactListClone = this.contacts.slice()
  this.conctactSelectedEvent.next(contactListClone)
}
}