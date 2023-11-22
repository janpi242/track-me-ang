import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedIn$ = new BehaviorSubject<boolean>(false)

  constructor(private storage: StorageService) { }

  getLoggedIn(): Observable<boolean> {
    return this.loggedIn$
  }

  async logInUser(username: string, token: string) {
    this.loggedIn$.next(true)
    await this.storage.setItem('token', token);
  }

  async logOutUser() {
    this.storage.removeItem('token')
  }
}
