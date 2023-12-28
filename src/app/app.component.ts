import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'
import { Capacitor } from '@capacitor/core'
import { Geolocation } from '@capacitor/geolocation'
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from './store/user.selectors';
import { LocationService } from './services/location.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  private isLoggedIn$ = this.store.select(selectIsLoggedIn)
  private isLoggedIn: boolean
  private interval

  constructor(
    private alertController: AlertController,
    private store: Store,
    private locationService: LocationService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$.subscribe(value => {
      this.isLoggedIn = value
    })
    this.userService.checkIfTokenPresent();
  }

  ngAfterViewInit(): void {
    this.checkPermissionsForGps()
  }

  async checkPermissionsForGps(): Promise<void> {
    const permissions = await Geolocation.checkPermissions()
    if (
      permissions.location === 'denied' &&
      permissions.coarseLocation === 'denied'
    ) {
      const platform = Capacitor.getPlatform()
      if (platform !== 'web') {
        Geolocation.requestPermissions()
      } else {
        this.presentAlert()
      }
    } else {
      this.watchPosition()
    }
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Location services not enabled.',
      message:
        '<p>In order to be able to track your position, geolocotaion services must be turned on on this device.</p>' +
        '<p>Please, turn them on and rester application.</p>',
      buttons: ['OK'],
    })

    await alert.present()
  }

  private watchPosition(): void {
    this.interval = setInterval(async () => {
      if (this.isLoggedIn) {
        this.locationService.savePosition()
      }
    }, 5000)
  }
}
