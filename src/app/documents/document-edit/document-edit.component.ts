import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router, Params } from '@angular/router';

import { DocumentService } from '../document.service';
import {Document} from '../document.model';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})

export class DocumentEditComponent implements OnInit {

  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  id:string;

  constructor(private route: ActivatedRoute, private documentService: DocumentService, private router: Router) { }

ngOnInit(){
  this.route.params.subscribe((params: Params) => {this.id = params["id"];
    this.id = params["id"];

    if (!params["id"]) {
      this.editMode = false;
      return;
    } else {
      this.editMode = true;
    }
    
    this.originalDocument = this.documentService.getDocument(this.id);
  
    if (!this.originalDocument) {
      return;
    }
    this.document = JSON.parse(JSON.stringify(this.originalDocument));

  
  });
}

  onCancel() {
    this.router.navigate(['/documents']);
  }

  initForm(){
    let docTitle = ''
    let docDescription = ''
    let docUrl = ''


    if (this.editMode){
      const document = this.documentService.getDocument(this.id);
      docTitle = document.name;
      docDescription = document.description;
      docUrl = document.url;
    }


  }

  onSubmit(form: NgForm) {
    console.log(form.value)
    const value = form.value;
    const newDocument = new Document(
      "",
      value.name,
      value.description,
      value.url,
      null
    );
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument)
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.onCancel();
  }    

}
