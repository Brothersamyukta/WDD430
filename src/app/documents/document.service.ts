import { Document } from './document.model';
import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  public docSelectedEvent = new EventEmitter<Document[]>();
  public document: Document[];

  constructor() {
    this.document = MOCKDOCUMENTS;
  }

  getDocuments() {
    //   Return a copy of it.
    return this.document.slice();
  }
  getDocument(id: string): Document {
    return this.document.find((doc) => doc.id === id);
  }

  deleteDocument(doc: Document) {
    console.log(doc)
    if (!doc) {
      return null;
    }
    const pos = this.document.indexOf(doc);
    console.log(pos)
    if (pos < 0) {
      return null;
    }
    this.document.splice(pos, 1);
    // const result = this.document.filter((doc) => doc.id !== id);
    // this.documentChangedEvent.emit(this.document.slice());
    this.docSelectedEvent.emit(this.document.slice());
  }
}