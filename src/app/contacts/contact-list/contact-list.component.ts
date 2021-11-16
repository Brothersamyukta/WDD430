import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Contact } from '../contact.model';
import {ContactService} from '../contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  

  contacts: Contact[]
  term: string;
  private contactChangedSubscription: Subscription
  constructor(private contactSerivce: ContactService, private route:ActivatedRoute, private router: Router) { }

  
  ngOnInit() {
  
    
    this.contactChangedSubscription=this.contactSerivce.conctactSelectedEvent.subscribe((contact: Contact[]) => {
      this.contacts = contact;
    });
    this.contactSerivce.getContactFromFB();
  }

  ngOnDestroy(){
    this.contactChangedSubscription.unsubscribe();
  }

  onCreateContact()
  {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  search(value: string) {
    this.term = value;
    console.log(this.term)
  }
  

}
