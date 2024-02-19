import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { Settings } from './../store/settings.model'
import { SettingsActions } from '../store/settings.actions';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings$: Observable<Settings>


  constructor(
    private storage: StorageService,
    private store: Store) {
  }

  async loadSettings(): Promise<void> {
    console.log('loading settings')
    this.settings$ = from(this.storage.getItem('settings')) as Observable<Settings>
    this.settings$.subscribe((settings) => {
      if (settings) {
        this.store.dispatch(SettingsActions.storeSettings(settings))
      }
    })
  }
}
