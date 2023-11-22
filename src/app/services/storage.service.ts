import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

// docs for Api of this third party library are here:
// https://github.com/ionic-team/ionic-storage

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null

  constructor(private storage: Storage) {
    this.init()
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage
  }

  async setItem(key: string, value: string | number): Promise<void> {
    await this._storage.set(key, value)
  }

  async getItem(key: string): Promise<string> {
    console.log(this._storage)
    return await this._storage.get(key)
  }

  async removeItem(key: string): Promise<void> {
    await this._storage.remove(key)
  }
}
