import { Component, AfterViewInit, OnInit } from '@angular/core'
import { Geolocation } from '@capacitor/geolocation'
import * as L from 'leaflet'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnInit {
  private map
  private zoom = 13
  constructor() {}

  ngOnInit(): void {
    L.Icon.Default.imagePath = 'assets/leaflet/'
  }
  ngAfterViewInit(): void {
    this.initMap()
  }

  async setCurrentPosition() {
    // Geolocation.requestPermissions().then(async (permission) => {
    const position = await Geolocation.getCurrentPosition()
    this.map.setView(
      new L.LatLng(position.coords.latitude, position.coords.longitude),
      this.zoom,
    )
    const marker = L.marker([
      position.coords.latitude,
      position.coords.longitude,
    ]).addTo(this.map)
    // })
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [0, 0],
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

    this.setCurrentPosition()
  }
}
