import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { StorageService } from './storage.service';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  existingToken$: Observable<string>;
  private loggedIn$ = new BehaviorSubject<boolean>(false)

  constructor(private storage: StorageService, private restService: RestService) {
    this.checkIfTokenPresent();
  }

  async checkIfTokenPresent() {
    this.existingToken$ = from(this.storage.getItem('token'))
    this.existingToken$.subscribe((userToken) => {
      if (userToken) {
        this.logInUser(userToken)
      } else {
        this.logOutUser();
      }
    })
  }

  getLoggedIn(): Observable<boolean> {
    return this.loggedIn$
  }

  async logInUser(token: string) {
    this.loggedIn$.next(true)
    await this.storage.setItem('token', token);
    const userData = await this.restService.getUserData(token)
    console.log('UserData:')
    console.log(userData.subscribe(val => { console.log(val) }))
  }

  async logOutUser() {
    console.log('logging out')
    this.storage.removeItem('token')
    this.loggedIn$.next(false)
    this.restService.logOut();
  }
}
