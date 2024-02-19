import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation'
import { Store } from '@ngrx/store';
import { selectUser } from '../store/user.selectors';
import { RestService } from './rest.service';
import { FriendsList } from '../store/friend.model';
import { PositionActions } from '../store/position.actions';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private user$ = this.store.select(selectUser)
  private user

  constructor(private store: Store, private restService: RestService) {
    this.user$.subscribe((user) => { this.user = user })
  }

  async savePosition() {
    const position = await Geolocation.getCurrentPosition()
    const userPositionData = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      timestamp: Date.now(),
      userId: this.user.id
    }
    this.restService.savePosition(userPositionData).subscribe(response => { console.log(response) })
  }

  getPositions(friendsList: FriendsList) {
    friendsList.friends.forEach(friend => {
      this.getPosition(friend.id);
    });
  }

  getPosition(friendId: number) {
    const friendPosition$ = this.restService.getPosition(friendId);
    friendPosition$.subscribe(friendPosition => {
      this.store.dispatch(PositionActions.savePosition(friendPosition))
    })
  }
}
