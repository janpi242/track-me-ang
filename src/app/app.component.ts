import { Component, OnInit } from '@angular/core';
import { RestService } from './services/rest.service';
import { StorageService } from './services/storage.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private storage: StorageService, private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    const token = await this.storage.getItem('token')
    if (token) {
      this.userService.logInUser('userAuto', token);
    }
  }
}
