import { Component, OnInit } from '@angular/core';
import { RestService } from './services/rest.service';
import { StorageService } from './services/storage.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private storage: StorageService, private userService: UserService) { }
}
