import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  public conctactSelectedEvent = new Subject<Contact[]>();
  public maxContactId: number;

  private contacts: Contact[] = [];
  constructor(private http:HttpClient) {
    // this.contacts = MOCKCONTACTS;
  }

  // getContacts(): Contact[] {
  //   return this.contacts
  //     .sort((a, b) => {
  //       if (a.name < b.name) {
  //         return -1;
  //       } else if (a.name > b.name) {
  //         return 1;
  //       } else {
  //         return 0;
  //       }
  //     })
  //     .slice();
  // }

  getContact(id: string) {
    //return this.contacts.find((contact) => contact.id === id);
    return this.http.get<{ message: string, contact: Contact}>('http://localhost:3000/contacts/' + id); //.subscribe(
  }

  // deleteContact(contact: Contact) {
  //   if (!contact) {
  //     return;
  //   }
  //   const pos = this.contacts.indexOf(contact);
  //   if (pos < 0) {
  //     return;
  //   }
  //   this.contacts.splice(pos, 1);
  //   // this.conctactSelectedEvent.next(this.contacts.slice());
  //   this.storeContactToFB()
  // }
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
//  addContact(newContact: Contact) {
//   if (!newContact) {
//     return
//   }

//   this.maxContactId++
//   newContact.id = this.maxContactId.toString();
//   this.contacts.push(newContact);
//   // const documentsListClone = this.contacts.slice()
//   // this.conctactSelectedEvent.next(documentsListClone)
//   this.storeContactToFB()
// }
// updateDocument(originalContact: Contact, newContact: Contact) {
//   if (!(originalContact||newContact)) {
//     return
//   }
  
//   const pos = this.contacts.indexOf(originalContact)
//   if (pos < 0) {
//     return
//   }
    
//   newContact.id = originalContact.id
//   this.contacts[pos] = newContact
//   // const contactListClone = this.contacts.slice()
//   // this.conctactSelectedEvent.next(contactListClone)
//   this.storeContactToFB()
// }

// getContactFromFB()
// {
//   this.http.get<Contact[]>('https://cms-wdd430-53dd4-default-rtdb.firebaseio.com/contacts.json')
//   .subscribe((contact:Contact[])=> {
//     this.contacts = contact;
//     this.maxContactId = this.getMaxId();
//     this.contacts.sort((a, b) =>
//       a.name < b.name ? 1 : a.name > b.name ? -1 : 0
//     );
//     this.conctactSelectedEvent.next(this.contacts.slice());
//   })
// }
// storeContactToFB() {
//   let contacts = JSON.stringify(this.contacts);

//   // Create a Header for Content Type

//   const headers = new HttpHeaders({
//     'Content-Type': 'application/json',
//   });
//   this.http
//     .put(
//       'https://cms-wdd430-53dd4-default-rtdb.firebaseio.com/contacts.json',
//       contacts,
//       { headers }
//     )
//     .subscribe(() => {
//       this.conctactSelectedEvent.next(this.contacts.slice());
//     });
// }


 send()
 {
  this.maxContactId = this.getMaxId()
  this.conctactSelectedEvent.next(this.contacts.slice())
 }

 getContacts() {
  this.http.get('http://localhost:3000/contacts').subscribe(
    // success method
    (contacts: any) => {
      this.contacts = contacts.contacts;
      this.send()
    },
    (error) => {
      console.log("I was here")
      console.log(error);
    }
  );
}

addContact(contact: Contact) {
  if (!contact) {
    return;
  }
  // make sure id of the new Contact is empty
  contact.id = '';

  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  // add to database
  this.http
    .post<{ message: string; contact: Contact }>(
      'http://localhost:3000/contacts',
      contact,
      { headers: headers }
    )
    .subscribe((responseData) => {
      // add new contact to contacts
      this.contacts.push(responseData.contact);
      this.send()
    });
}


updateContact(originalContact: Contact, newContact: Contact) {
  //check if contact or update is defined
  if (!originalContact || !newContact) {
    //exit
    return;
  }

  //get position in list of contacts
  const pos = this.contacts.findIndex((d) => d.id == originalContact.id);
  //if position is not in array
  if (pos < 0) {
    //exit
    return;
  }
  newContact.id = originalContact.id;

  //set headers
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  //send req with contact id, object and headers
  this.http
    .put('http://localhost:3000/contacts/' + originalContact.id, newContact, {
      headers: headers,
    })
    //subscribe to response
    .subscribe((response: Response) => {
      //assign contacts list
      this.contacts[pos] = newContact;
      //emit changes
      this.send();
    });
}


deleteContact(contact: Contact) {
  if (!contact) {
    return;
  }

  const pos = this.contacts.findIndex((d) => d.id === contact.id);

  if (pos < 0) {
    return;
  }

  // delete from database
  this.http
    .delete('http://localhost:3000/contacts/' + contact.id)
    .subscribe((response: Response) => {
      this.contacts.splice(pos, 1);
      this.send();
    });
}




}