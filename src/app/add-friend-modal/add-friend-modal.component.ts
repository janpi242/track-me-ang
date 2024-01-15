import { Component, OnDestroy, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { AlertController, AlertOptions, ModalController } from '@ionic/angular'
import { RestService } from '../services/rest.service'
import { Store } from '@ngrx/store'
import { selectUser } from '../store/user.selectors'
import { User } from '../store/user.model'
import { Subscription } from 'rxjs'
import { alertData } from './alert-data'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-add-friend-modal',
  templateUrl: './add-friend-modal.component.html',
  styleUrls: ['./add-friend-modal.component.scss'],
})
export class AddFriendModalComponent implements OnInit, OnDestroy {
  private user$ = this.store.select(selectUser)
  private userSubscription$: Subscription
  private user: User

  constructor(
    private modalCtrl: ModalController,
    private restService: RestService,
    private userService: UserService,
    private store: Store,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.userSubscription$ = this.user$.subscribe((user) => this.user = { ...user })
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel')
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm')
  }

  onSubmit(form: NgForm) {
    console.log(`is form valid?: ${form.valid}`);
    if (!form.valid) {
      return
    }
    if (form.value.email === this.user.email) {
      this.showDialog(alertData.sameEmailError)
      return
    }
    const friendData = {
      myId: this.user.id,
      friendsEmail: form.value.email
    }
    this.restService.addFriend(friendData).subscribe((responseData) => {
      this.showDialog(alertData.success)
      this.confirm()
      this.userService.getFriends()
    },
      (error) => {
        if (error.status === 400) {
          this.showDialog(alertData.notFound)
        } else {
          this.showDialog(alertData.otherError)
        }
      }
    )
  }

  async showDialog(alertContents: AlertOptions) {
    const alert = await this.alertController.create(alertContents)

    await alert.present()
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe()
  }
}
