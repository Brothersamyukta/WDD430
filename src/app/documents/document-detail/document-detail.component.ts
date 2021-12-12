import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../document.model'
import { ActivatedRoute, Params, Router } from '@angular/router';
import {DocumentService} from '../document.service';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  id: string;
  nativeWindow: any;
  display: boolean = false;

  constructor(private route:ActivatedRoute, private docService: DocumentService, private router:Router,    private windowRefService: WindRefService) {
    this.nativeWindow = this.windowRefService.getNativeWindow();
   }

  ngOnInit() {
    this.route.params.subscribe((params: Params)=> {
      this.id = params['id']
      this.document = this.docService.getDocument(this.id)
    })
  }

  onView()
  {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete()
  {
    this.display = true;
    this.docService.deleteDocumentToBackend(this.document);
    this.router.navigate(['/documents'], { relativeTo: this.route });
  }

  onEdit()
  {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

}
