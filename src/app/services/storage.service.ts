import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable, from } from 'rxjs';

// docs for Api of this third party library are here:
// https://github.com/ionic-team/ionic-storage

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null
  private token$ = new BehaviorSubject<string>('')

  constructor(private storage: Storage) {
    this.init()
  }

  async init() {
    if(!this._storage) {
      this._storage = await this.storage.create();
    }
  }

  async setItem(key: string, value: string | number): Promise<void> {
    await this._storage.set(key, value)
  }

  async getItem(key: string): Promise<string> {
    if(!this._storage) {
      await this.init()
    }
    const token = await this._storage.get(key)
    this.token$.next(token);
    return token;
  }

  async removeItem(key: string): Promise<void> {
    this.token$.next('');
    await this._storage.remove(key)
  }
}
