import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../store/user.selectors';
import { UserService } from '../services/user.service';
import { ModalController } from '@ionic/angular';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { StorageService } from '../services/storage.service';
import { Settings, Interval, MapType } from '../store/settings.model'
import { SettingsActions } from '../store/settings.actions';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  public isLoggedIn$ = this.store.select(selectIsLoggedIn)
  public mapType: MapType = 'osm'
  public interval = 60

  constructor(
    private store: Store,
    private storage: StorageService,
    private userService: UserService,
    private modalCtrl: ModalController,
  ) { }

  async ngOnInit() {
    const settings$ = await this.storage.getItem('settings')
    if(settings$) {
      this.mapType = (settings$ as Settings).mapType
      this.interval = (settings$ as Settings).interval
    }
  }

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

  logout(): void {
    this.userService.logOutUser()
  }

  saveSettings(): void {
    console.log('saveSettings')
    const settings = {
      mapType: this.mapType,
      interval: this.interval
    }
    this.storage.setItem('settings', settings as Settings)
    this.store.dispatch(SettingsActions.storeSettings(settings as Settings))
  }
}
