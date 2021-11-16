import { Document } from './document.model';
import { Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  public docSelectedEvent = new Subject<Document[]>();
  public document: Document[];
  public maxDocumentId: number;

  constructor(private http: HttpClient) {
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
    if (!doc) {
      return null;
    }
    const pos = this.document.indexOf(doc);
    if (pos < 0) {
      return null;
    }
    this.document.splice(pos, 1);
    // const result = this.document.filter((doc) => doc.id !== id);
    // this.documentChangedEvent.emit(this.document.slice());
    // this.docSelectedEvent.next(this.document.slice());

    this.storeDocumentToFB();
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
  if (!newDocument) {
    return
  }

  this.maxDocumentId++
  newDocument.id = this.maxDocumentId.toString();
  this.document.push(newDocument);
  
  // const documentsListClone = this.document.slice()
  // this.docSelectedEvent.next(documentsListClone)
  this.storeDocumentToFB();
}
updateDocument(originalDocument: Document, newDocument: Document) {

  if (!(originalDocument||newDocument)) {
    return
  }
  
  const pos = this.document.indexOf(originalDocument)
  if (pos < 0) {
    return
  }

  newDocument.id = originalDocument.id
  this.document[pos] = newDocument
  // const documentsListClone = this.document.slice()
  // this.docSelectedEvent.next(documentsListClone)
  this.storeDocumentToFB()
}

getDocumentFromFB()
{
  this.http.get<Document[]>('https://cms-wdd430-53dd4-default-rtdb.firebaseio.com/documents.json')
    .subscribe((document: Document[])=> {
      this.document = document;
      this.maxDocumentId = this.getMaxId();
      //sort alphabetically by name
      this.document.sort((a, b) =>
        a.name < b.name ? 1 : a.name > b.name ? -1 : 0
      );
      this.docSelectedEvent.next(this.document.slice());
    }, (error)=> {
      console.log(error)
    })
}

storeDocumentToFB() {
  // Stringify -- convert it to JSON
  let documents = JSON.stringify(this.document);

  // Create a header for content type
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  this.http
    .put(
      'https://cms-wdd430-53dd4-default-rtdb.firebaseio.com/documents.json',
      documents,
      {
        headers: headers,
      }
    )
    .subscribe(() => {
      //If We successfully put, signal that doucment list has changed and send a copy to document list
      this.docSelectedEvent.next(this.document.slice());
    });
}

}