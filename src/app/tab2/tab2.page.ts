import { Component } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { LoginModalComponent } from '../login-modal/login-modal.component'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(private modalCtrl: ModalController, private userService: UserService) { }

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
