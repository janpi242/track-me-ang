import { AfterViewInit, Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { AlertController } from '@ionic/angular'
import { Capacitor } from '@capacitor/core'
import { Geolocation } from '@capacitor/geolocation'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  private interval;
  constructor(private storage: StorageService, private alertController: AlertController, private store: Store) { }

  ngAfterViewInit(): void {
    this.checkPermissionsForGps()
  }

  async checkPermissionsForGps() {
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

  async presentAlert() {
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
      const position = await Geolocation.getCurrentPosition()
      console.log(position);
    }, 10000)
  }
}
