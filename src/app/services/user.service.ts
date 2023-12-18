import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { StorageService } from './storage.service';
import { RestService } from './rest.service';
import { Store } from '@ngrx/store';
import { UserActions } from '../store/user.actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  existingToken$: Observable<string>;

  constructor(private storage: StorageService, private restService: RestService, private store: Store) {
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

  async logInUser(token: string) {
    await this.storage.setItem('token', token);
    const userData$ = await this.restService.getUserData(token)
    userData$.subscribe(response => {
      console.log(response)
      const userData = { token, id: response.id, name: response.name, email: response.email }
      this.store.dispatch(UserActions.loginUser(userData))
    })
  }

  async logOutUser() {
    this.storage.removeItem('token')
    this.restService.logOut();
    this.store.dispatch(UserActions.logoutUser())
  }
}
