import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation'
import { Store } from '@ngrx/store';
import { selectUser } from '../store/user.selectors';
import { RestService } from './rest.service';
import { FriendsList } from '../store/friend.model';
import { UserActions } from '../store/user.actions';

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
      timestamp: Date.now(),
      userId: this.user.id
    }
    this.restService.saveLocation(userLocationData).subscribe(response => { console.log(response) })
  }

  getPositions(friendsList: FriendsList) {
    friendsList.friends.forEach(friend => {
      this.getPosition(friend.id);
    });
  }

  getPosition(friendId: number) {
    const friendPosition$ = this.restService.getPosition(friendId);
    friendPosition$.subscribe(friendPosition => {
      console.log(JSON.parse(JSON.stringify(friendPosition)))
      console.log('before dispatch')
      this.store.dispatch(UserActions.savePosition(friendPosition))
    })
  }
}
