import { Component, Input, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { LoginModalComponent } from '../login-modal/login-modal.component'
import { AddFriendModalComponent } from '../add-friend-modal/add-friend-modal.component'
import { Store } from '@ngrx/store'
import { selectFriends, selectIsLoggedIn } from '../store/user.selectors'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  public isLoggedIn$ = this.store.select(selectIsLoggedIn)
  public friends$ = this.store.select(selectFriends)

  constructor(private modalCtrl: ModalController, private store: Store) { }

  async openLoginModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: LoginModalComponent,
    })
    modal.present()

    const { data, role } = await modal.onWillDismiss()

    if (role === 'confirm') {
      console.log(data)
    }
  }

  async showAddFriendModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddFriendModalComponent,
    })
    modal.present()

    const { data, role } = await modal.onWillDismiss()

    if (role === 'confirm') {
      console.log(data)
    }
  }
}
