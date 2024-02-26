import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { selectPositions } from '../store/position.selectors';
import { Store } from '@ngrx/store';
import { Geolocation } from '@capacitor/geolocation'

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit, OnDestroy {
  @Input() events: Observable<void>;
  @ViewChild('googleMap', { static: true }) mapRef: ElementRef;

  map: GoogleMap;
  private positions$ = this.store.select(selectPositions)
  private eventsSubscription: Subscription;
  private userMarker
  private friendsMarkers = []

  constructor(private store: Store) {
    this.positions$.subscribe((positionsFeature) => {
      this.updateMarkers(positionsFeature.positions)
    })
  }

  ngOnInit() {
    this.initMap()
    this.eventsSubscription = this.events.subscribe(() => this.centerMap());
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  updateMarkers(positions): void {
    this.clearFriendsMarkers()
    positions?.forEach(async (position) => {
      if (position.latitude && position.longitude) {
        const marker = await this.map.addMarker({
          coordinate: {
            lat: position.latitude,
            lng: position.longitude
          }
        })
        this.friendsMarkers.push(marker)
      }
    })
  }

  clearFriendsMarkers(): void {
    this.map?.removeMarkers(this.friendsMarkers)
    this.friendsMarkers=[]
  }

  async centerMap(): Promise<void> {
    const position = await Geolocation.getCurrentPosition()
    await this.map.setCamera({
      coordinate: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    })
  }

  async setCurrentPosition(): Promise<void> {
    const position = await Geolocation.getCurrentPosition()
    await this.map.setCamera({
      coordinate: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    });
    this.userMarker = await this.map.addMarker({
      coordinate: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    })
  }

  async initMap() {
    this.map = await GoogleMap.create({
      id: 'google-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.apiKey,
      config: {
        streetViewControl: false,
        fullscreenControl: false,
        center: {
          lat: 12.6125912,
          lng: -7.9955131,
        },
        zoom: 12,
      },
    });
    this.setCurrentPosition()
  }
}
