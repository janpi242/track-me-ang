import { Component, AfterViewInit, OnInit } from '@angular/core'
import { Capacitor } from '@capacitor/core'
import { Geolocation } from '@capacitor/geolocation'
import { AlertController } from '@ionic/angular'
import * as L from 'leaflet'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnInit {
  private map
  private zoom = 13
  private interval
  constructor(private alertController: AlertController) {}

  ngOnInit(): void {
    L.Icon.Default.imagePath = 'assets/leaflet/'
  }

  ngAfterViewInit(): void {
    this.initMap()
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
        Geolocation.requestPermissions().then(async (permission) => {
          this.setCurrentPosition()
        })
      } else {
        this.presentAlert()
      }
    } else {
      this.setCurrentPosition()
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

  async setCurrentPosition() {
    const position = await Geolocation.getCurrentPosition()
    this.map.setView(
      new L.LatLng(position.coords.latitude, position.coords.longitude),
      this.zoom,
    )
    const marker = L.marker([
      position.coords.latitude,
      position.coords.longitude,
    ]).addTo(this.map)
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [12.6125912, -7.9955131],
      zoom: this.zoom,
    })

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 1,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      },
    )

    tiles.addTo(this.map)

    this.map.whenReady(() => {
      setTimeout(() => {
        this.map.invalidateSize()
      }, 1)
    })
  }

  private watchPosition(): void {
    this.interval = setInterval(async () => {
      const position = await Geolocation.getCurrentPosition()
      console.log(position);
    }, 10000)
  }
}
