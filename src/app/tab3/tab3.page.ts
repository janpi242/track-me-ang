import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  // isUserLoggedIn = false
  // username = '123'
  public loggedIn$: Observable<boolean>

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.loggedIn$ = this.userService.getLoggedIn();
    this.loggedIn$.subscribe((loggedIn) => { console.log(loggedIn) })
  }
  // getLoggedIn(): void {
  //   this.userService.getLoggedIn()
  //     .subscribe(isUserLoggedIn => this.isUserLoggedIn = isUserLoggedIn)
  // }
  // getUsername(): void {
  //   this.userService.getUsername()
  //     .subscribe(username => this.username = username)
  // }
}
