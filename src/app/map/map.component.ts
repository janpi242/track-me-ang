import { Component, AfterViewInit, OnInit } from '@angular/core'
import { Geolocation } from '@capacitor/geolocation'
import { Store } from '@ngrx/store';
import { selectPositions } from '../store/position.selectors'
import * as L from 'leaflet'
import { PositionState } from '../store/position.reducer';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnInit {
  private map
  private zoom = 13
  private userMarker
  private positions$ = this.store.select(selectPositions)

  constructor(private store: Store) {
    this.positions$.subscribe((positionsFeature) => {
      this.updateMarkers(positionsFeature.positions)
    })
  }

  ngOnInit(): void {
    L.Icon.Default.imagePath = 'assets/leaflet/'
  }

  ngAfterViewInit(): void {
    this.initMap()
    this.setCurrentPosition()
  }

  updateMarkers(positions) {
    positions?.forEach((position) => {
      if (position.latitude && position.longitude) {
        L.marker([
          position.latitude,
          position.longitude,
        ]).addTo(this.map)
      }
    });
  }

  async setCurrentPosition() {
    const position = await Geolocation.getCurrentPosition()
    this.map.setView(
      new L.LatLng(position.coords.latitude, position.coords.longitude),
      this.zoom,
    )
    this.userMarker = L.marker([
      position.coords.latitude,
      position.coords.longitude,
    ],
      { title: 'Me' }).addTo(this.map)
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
}
