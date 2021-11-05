import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService} from '../document.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents: Document[];
  constructor(private documentService: DocumentService, private router:Router, private route:ActivatedRoute) { }
  

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.documentService.docSelectedEvent.subscribe(doc=> {
      this.documents = doc;
    })
  }

  // onSelected(document: Document) {
  //   this.selectedDocumentEvent.emit(document);
  // }

  onNewDocs()
  {
    this.router.navigate(['new'], {relativeTo:this.route})
  }
}
