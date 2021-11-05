import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import {ContactService} from '../contact.service';

import {ActivatedRoute, Params,Router } from '@angular/router';
@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  
  contact: Contact;
  id:string

  constructor(private route: ActivatedRoute, private contSl:ContactService , private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params)=> {
      this.id =params['id']
      this.contact = this.contSl.getContact(this.id)
    })
  }

  onEditContact()
  {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteContact(){
    this.contSl.deleteContact(this.contact);
    this.router.navigate(['/contacts'], { relativeTo: this.route });
  }

}
