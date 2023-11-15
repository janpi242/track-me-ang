import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { LoginModalComponent } from '../login-modal/login-modal.component'
import { UserService } from '../services/user.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit{
  public loggedIn$: Observable<boolean>

  constructor(private modalCtrl: ModalController, private userService: UserService) { }

  ngOnInit(): void {
    this.loggedIn$ = this.userService.getLoggedIn();
    this.loggedIn$.subscribe((loggedIn) => { console.log(loggedIn) })
  }

  async openLoginModal() {
    const modal = await this.modalCtrl.create({
      component: LoginModalComponent,
    })
    modal.present()

    const { data, role } = await modal.onWillDismiss()

    if (role === 'confirm') {
      console.log(data)
    }
  }
}
