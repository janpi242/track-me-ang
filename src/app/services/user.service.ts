import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  existingToken$: Observable<string>;
  private loggedIn$ = new BehaviorSubject<boolean>(false)

  constructor(private storage: StorageService) {
    this.checkIfTokenPresent();
  }

  async checkIfTokenPresent() {
    this.existingToken$ = from(this.storage.getItem('token'))
    this.existingToken$.subscribe((userToken) => {
      if (userToken) { this.logInUser('aaa', userToken) } else {
        this.logOutUser();
      }
    })
  }

  getLoggedIn(): Observable<boolean> {
    return this.loggedIn$
  }

  async logInUser(username: string, token: string) {
    console.log('logging in')
    this.loggedIn$.next(true)
    await this.storage.setItem('token', token);
  }

  async logOutUser() {
    console.log('logging out')
    this.storage.removeItem('token')
    this.loggedIn$.next(false)
  }
}
