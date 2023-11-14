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
    console.log('in service')
  }

  // loggedIn = false;
  // jwtToken: string;
  // username: string;

  // loggedInChange: Subject<boolean> = new Subject<boolean>();
  // jwtTokenChange: Subject<string> = new Subject<string>();
  // usernameChange: Subject<string> = new Subject<string>();

  // logInUser(username: string, token: string) {
  //   this.loggedIn = true;
  //   this.jwtToken = token
  //   this.username = username
  // }

  // constructor() {
  //   this.loggedIn$ = this.loggedInChange.asObservable();
  //   this.jwtToken$ = this.jwtTokenChange.asObservable();
  //   this.username$ = this.usernameChange.asObservable();
  // }

  // loginUser(username: string, jwtToken: string) {
  //   this.loggedIn = true;
  //   this.jwtToken = jwtToken;
  //   this.username = username;
  //   this.updateSubscribers();
  // }

  // logoutUser() {
  //   this.loggedIn = false;
  //   this.jwtToken = '';
  //   this.username = '';
  //   this.updateSubscribers();
  // }

  // private updateSubscribers() {
  //   this.loggedInChange.next(this.loggedIn);
  //   this.jwtTokenChange.next(this.jwtToken);
  //   this.usernameChange.next(this.username);
  //   console.log(this.username);
  // }
}
