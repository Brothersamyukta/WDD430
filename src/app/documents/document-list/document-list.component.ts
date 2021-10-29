import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  constructor() { }

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document (
      '1', 
      'Document',
      'Angular',
      'https://angularjs.org',
      undefined
    ),
    new Document (
      '2', 
      'Calculas',
      'derivaties and integral',
      'https://angularjs.org',
      undefined
    ),
    new Document (
      '2', 
      'Science',
      'motion and energy',
      'https://angularjs.org',
      undefined
    ),
    new Document (
      '2', 
      'Programming',
      'functions and loops',
      'https://angularjs.org',
      undefined
    ),
  ];
  

  ngOnInit() {
  }

  onSelected(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
