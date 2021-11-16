import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService} from '../document.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {

  documents: Document[];
  private documnetChangedSubscription: Subscription
  constructor(private documentService: DocumentService, private router:Router, private route:ActivatedRoute) { }
  

  ngOnInit() {
    this.documentService.getDocumentFromFB();
    this.documnetChangedSubscription=this.documentService.docSelectedEvent.subscribe(doc=> {
      this.documents = doc;
    })
  }

  ngOnDestroy(){
    this.documnetChangedSubscription.unsubscribe();
  }

  // onSelected(document: Document) {
  //   this.selectedDocumentEvent.emit(document);
  // }

  onNewDocs()
  {
    this.router.navigate(['new'], {relativeTo:this.route})
  }
}
