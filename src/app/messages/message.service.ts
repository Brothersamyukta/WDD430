import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  maxMessageId: number;
  public message: Message[];

  constructor(private http: HttpClient) {
    this.message = MOCKMESSAGES;
    this.getMessageFromFB()
  }

  addMessage(message: Message) {
    // this.message.push(message);
    // this.messageChangedEvent.emit(this.message.slice());

this.message.push(message)
this.storeMessageToFB()
  }

  getMessage(id: string): Message {
    return this.message.find((message) => message.id === id);
  }
  
  getMessages(): Message[] {
    return this.message.slice();
  }

  // method to get max id number 
  getMaxId(): number {
    //variable to hold max Id
    let maxId = 0;
    //loop through the message list
    for (const message of this.message) {
      //get current id as a number
      const currentId = +message.id;
      //if the current id is greater than max ID...
      if (currentId > maxId) {
        //then max id is the current id
        maxId = currentId;
      }
    }
    //return that max id
    return maxId;
  }

  getMessageFromFB() {
    //use http get
    this.http
      .get('https://cms-wdd430-53dd4-default-rtdb.firebaseio.com/messages.json')
      .subscribe((message: Message[]) => {
        this.message = message;
        this.maxMessageId = this.getMaxId();
        this.message.sort((a, b) => (a.id < b.id ? 1 : a.id > b.id ? -1 : 0));
        //signal that the list has changed
        this.messageChangedEvent.next(this.message.slice());
      }),
      (error: any) => {
        console.log(error);
      };
  }


  storeMessageToFB() {
    //stringify the list of documnts
    let messages = JSON.stringify(this.message);

    //create header for content type
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http
      .put(
        'https://cms-wdd430-53dd4-default-rtdb.firebaseio.com/messages.json',
        messages,
        {
          headers: headers,
        }
      )

      // Subscribe to Response

      .subscribe(() => {
        //once a response has been received, signal that the document list has changed, send copy of list
        this.messageChangedEvent.next(this.message.slice());
      });
  }
  
}