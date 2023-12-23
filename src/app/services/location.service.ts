import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation'
import { Store } from '@ngrx/store';
import { selectUser } from '../store/user.selectors';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private user$ = this.store.select(selectUser)
  private user

  constructor(private store: Store, private restService: RestService) {
    this.user$.subscribe((user) => { this.user = user })
  }

  async savePosition() {
    const position = await Geolocation.getCurrentPosition()
    const userLocationData = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      timestamp: position.timestamp,
      userId: this.user.id
    }
    this.restService.saveLocation(userLocationData)
  }
}
