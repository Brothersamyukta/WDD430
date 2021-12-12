import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Contact} from "../contact.model"
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  // genders: ["male", "female"];
  // signupForm: FormGroup;
  // forbiddenUsernames = ["Chris", "Anna"]
  originalContact: Contact 
  id
  editMode:boolean = false 
  contact: Contact;
  groupContacts: Contact[] = [];

  constructor(private route:ActivatedRoute,private contactService: ContactService, private router: Router ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {this.id = params["id"];

    if (!this.id) {
      this.editMode = false;
      return;
    }
    this.contactService.getContact(this.id).subscribe(contactData => {
      this.originalContact = contactData.contact;
    });
  
    if (!this.originalContact) {
      return;
    }

    this.editMode = true;
    this.contact = JSON.parse(JSON.stringify(this.originalContact));

    if (this.contact.group) {
      // this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
      this.groupContacts = [...this.contact.group];
    }
  
  });
}

  onCancel() {
    this.router.navigate(['/contacts']);
  }
  onSubmitContact(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(
      "",
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupContacts
    );
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact)
    } else {
      this.contactService.addContact(newContact);
    }

    this.onCancel()
  }    

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      // newContact has no value
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }

}


