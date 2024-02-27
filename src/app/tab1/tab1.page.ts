import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { selectMapType } from '../store/settings.selectors';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  eventsSubject: Subject<void> = new Subject<void>();
  public mapType
  private mapType$ = this.store.select(selectMapType)

  constructor(private store: Store,) {}

  ngOnInit(): void {
    this.mapType$.subscribe(value => {
      this.mapType = value
    })
  }

  emitCenterMap(): void {
    this.eventsSubject.next();
  }
}
