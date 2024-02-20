import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  eventsSubject: Subject<void> = new Subject<void>();
  constructor() {}

  emitCenterMap() {
    this.eventsSubject.next();
  }
}
