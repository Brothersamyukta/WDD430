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
    // this.document = MOCKDOCUMENTS;
    //   this.maxDocumentId = this.getMaxId();

  }

  getDocuments() {
    //   Return a copy of it.
    return this.document.slice();
  }
  getDocument(id: string): Document {
    return this.document.find((doc) => doc.id === id);
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

 send()
 {
  this.maxDocumentId = this.getMaxId();
  this.docSelectedEvent.next(this.document.slice());
 }

 getDocumentFromBackend(){
  this.http.get('http://localhost:3000/documents').subscribe(
    // success method
    (documents: any) => {
      this.document = documents.documents;
      this.send()
    },
    (error: any) => {
      console.log(error);
    }
  );
 }

 addDocumentToBackend(document: Document) {

  console.log("I was called" + document)
  if (!document) {
    return;
  }
  // make sure id of the new Document is empty
  document.id = '';
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  // add to database
  this.http
    .post<{ message: string; document: Document }>(
      'http://localhost:3000/documents',
      document,
      { headers: headers }
    )
    .subscribe((responseData) => {
      // add new document to documents
      this.document.push(responseData.document);
      this.send()
    }, (error)=> {
      console.log("Error Adding Documents")
    });
}

updateDocumentToBackend(originalDocument: Document, newDocument: Document) {
  if (!originalDocument || !newDocument) {
    return;
  }

  const pos = this.document.findIndex((d) => d.id === originalDocument.id);

  if (pos < 0) {
    return;
  }

  // set the id of the new Document to the id of the old Document
  newDocument.id = originalDocument.id;

  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  // update database
  this.http
    .put(
      'http://localhost:3000/documents/' + originalDocument.id,
      newDocument,
      { headers: headers }
    )
    .subscribe((response: Response) => {
      this.document[pos] = newDocument;
      this.send()
    });
}


deleteDocumentToBackend(document: Document) {
  if (!document) {
    return;
  }

  const pos = this.document.findIndex((d) => d.id === document.id);

  if (pos < 0) {
    return;
  }

  // delete from database
  this.http
    .delete('http://localhost:3000/documents/' + document.id)
    .subscribe((response: Response) => {
      this.document.splice(pos, 1);
      this.send()
    });
}




//  addDocument(newDocument: Document) {
//   if (!newDocument) {
//     return
//   }

//   this.maxDocumentId++
//   newDocument.id = this.maxDocumentId.toString();
//   this.document.push(newDocument);
  
//   // const documentsListClone = this.document.slice()
//   // this.docSelectedEvent.next(documentsListClone)
//   this.storeDocumentToFB();
// }
// updateDocument(originalDocument: Document, newDocument: Document) {

//   if (!(originalDocument||newDocument)) {
//     return
//   }
  
//   const pos = this.document.indexOf(originalDocument)
//   if (pos < 0) {
//     return
//   }

//   newDocument.id = originalDocument.id
//   this.document[pos] = newDocument
//   // const documentsListClone = this.document.slice()
//   // this.docSelectedEvent.next(documentsListClone)
//   this.storeDocumentToFB()
// }



// getDocumentFromFB()
// {
//   this.http.get<Document[]>('https://cms-wdd430-53dd4-default-rtdb.firebaseio.com/documents.json')
//     .subscribe((document: Document[])=> {
//       this.document = document;
//       this.maxDocumentId = this.getMaxId();
//       //sort alphabetically by name
//       this.document.sort((a, b) =>
//         a.name < b.name ? 1 : a.name > b.name ? -1 : 0
//       );
//       this.docSelectedEvent.next(this.document.slice());
//     }, (error)=> {
//       console.log(error)
//     })
// }

// storeDocumentToFB() {
//   // Stringify -- convert it to JSON
//   let documents = JSON.stringify(this.document);

//   // Create a header for content type
//   const headers = new HttpHeaders({
//     'Content-Type': 'application/json',
//   });

//   this.http
//     .put(
//       'https://cms-wdd430-53dd4-default-rtdb.firebaseio.com/documents.json',
//       documents,
//       {
//         headers: headers,
//       }
//     )
//     .subscribe(() => {
//       //If We successfully put, signal that doucment list has changed and send a copy to document list
//       this.docSelectedEvent.next(this.document.slice());
//     });
// }

}