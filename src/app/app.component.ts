import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'
import { Capacitor } from '@capacitor/core'
import { Geolocation } from '@capacitor/geolocation'
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from './store/user.selectors';
import { PositionService } from './services/position.service';
import { UserService } from './services/user.service';
import { selectInterval } from './store/settings.selectors';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  private isLoggedIn$ = this.store.select(selectIsLoggedIn)
  private isLoggedIn: boolean
  private interval$ = this.store.select(selectInterval)
  private interval

  constructor(
    private alertController: AlertController,
    private store: Store,
    private positionService: PositionService,
    private userService: UserService,
    private settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
    this.settingsService.loadSettings()
    this.userService.checkIfTokenPresent();

    this.isLoggedIn$.subscribe(value => {
      this.isLoggedIn = value
    })

    this.interval$.subscribe(minutes => {
      this.stopWatchingPosition()
      this.watchPosition(minutes)
    })
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
      this.watchPosition(60)
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

  private stopWatchingPosition(): void {
    console.log('stopWatchingPosition')
    clearInterval(this.interval)
  }

  private watchPosition(minutes: number): void {
    console.log('watchPosition', minutes)
    this.interval = setInterval(async () => {
      if (this.isLoggedIn) {
        this.positionService.savePosition()
      }
    }, minutes * 60 * 1000)
  }
}
