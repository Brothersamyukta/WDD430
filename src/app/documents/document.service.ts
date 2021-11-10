import { Document } from './document.model';
import { Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  public docSelectedEvent = new Subject<Document[]>();
  public document: Document[];
  public maxDocumentId: number;

  constructor() {
    this.document = MOCKDOCUMENTS;
      this.maxDocumentId = this.getMaxId();
  
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
    this.docSelectedEvent.next(this.document.slice());
  }

  getMaxId(): number {
    let maxId = 0

    for (const document of this.document){
      let currentId = parseInt(document.id);

        if (currentId > maxId){
            maxId = currentId;
        }         
    }

  return maxId;
 }
 addDocument(newDocument: Document) {
  if (newDocument === null) {
    return
  }

  this.maxDocumentId++
  let docId = Number(newDocument.id)
  docId= this.maxDocumentId;
  this.document.push(newDocument);
  
  const documentsListClone = this.document.slice()
  this.docSelectedEvent.next(documentsListClone)
}
updateDocument(originalDocument: Document, newDocument: Document) {
  if (!originalDocument||newDocument) {
    return
  }
  
  const pos = this.document.indexOf(originalDocument)
  if (pos < 0) {
    return
  }
    
  newDocument.id = originalDocument.id
  this.document[pos] = newDocument
  const documentsListClone = this.document.slice()
  this.docSelectedEvent.next(documentsListClone)
}
}