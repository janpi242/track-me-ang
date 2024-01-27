import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { StorageService } from './storage.service';
import { RestService } from './rest.service';
import { Store } from '@ngrx/store';
import { UserActions } from '../store/user.actions';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  existingToken$: Observable<string>;

  constructor(
    private storage: StorageService,
    private restService: RestService,
    private locationService: LocationService,
    private store: Store) { }

  async checkIfTokenPresent(): Promise<void> {
    this.existingToken$ = from(this.storage.getItem('token'))
    this.existingToken$.subscribe((userToken) => {
      if (userToken) {
        this.logInUser(userToken)
      } else {
        this.logOutUser();
      }
    })
  }

  async logInUser(token: string): Promise<void> {
    await this.storage.setItem('token', token);
    const userData$ = await this.restService.getUserData(token)
    userData$.subscribe(response => {
      console.log(response)
      const userData = { token, id: response.id, name: response.name, email: response.email }
      console.log(userData)
      this.store.dispatch(UserActions.loginUser(userData))
      this.getFriends()
    })
  }

  getFriends() {
    const friendsData$ = this.restService.getFriends()
    friendsData$.subscribe(friendsList => {
      console.log(friendsList)
      this.store.dispatch(UserActions.storeFriends(friendsList))
      this.locationService.getPositions(friendsList)
    })
  }

  async logOutUser(): Promise<void> {
    this.storage.removeItem('token')
    this.restService.logOut();
    this.store.dispatch(UserActions.logoutUser())
  }
}
