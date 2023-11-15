import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedIn$ = new BehaviorSubject<boolean>(false)

  public getLoggedIn(): Observable<boolean>{
    return this.loggedIn$
  }

  public logInUser(username: string, token: string) {
    this.loggedIn$.next(true)
  }
}
