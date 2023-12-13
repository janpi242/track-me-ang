import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '../store/user.selectors';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  public user$ = this.store.select(selectUser)

  constructor(private userService: UserService, private store: Store) { }

  logout() {
    this.userService.logOutUser()
  }
}
