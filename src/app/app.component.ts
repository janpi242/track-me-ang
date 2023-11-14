import { Component } from '@angular/core';
import { RestService } from './services/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private restService: RestService) {
    // this.restService.getToken().subscribe((resp) => {
      this.restService.logOut().subscribe((response) => {
        console.log(response);
      })
    // })
  }
}
