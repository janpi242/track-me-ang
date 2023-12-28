import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../store/user.selectors';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  public isLoggedIn$ = this.store.select(selectIsLoggedIn)

  constructor(private userService: UserService, private store: Store) { }

  logout(): void {
    this.userService.logOutUser()
  }
}
