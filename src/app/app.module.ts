import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { DropdownDirective } from './dropdown.directive';
import {ContactItemComponent} from './contacts/contact-list/contact-item/contact-item.component';
import { DocumentItemComponent } from './documents/document-list/document-item/document-item.component';
import { MesssageItemComponent } from './messages/message-list/messsage-item/messsage-item.component';
import { AppRoutingModule } from './app-routing.module';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactListComponent,
    ContactDetailComponent,
    DocumentsComponent,
    DocumentListComponent,
    DocumentDetailComponent,
    MessagesComponent,
    MessageListComponent,
    MessageEditComponent,
    ContactItemComponent,
    DropdownDirective,
    DocumentItemComponent,
    MesssageItemComponent,
    DocumentEditComponent,
    ContactEditComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
