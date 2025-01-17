import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { ApiResult } from '../types/types';
import { selectUser } from '../store/user.selectors';
import { Store } from '@ngrx/store';
import { FriendsList } from '../store/friend.model';
import { Position } from '../store/position.model';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private user$ = this.store.select(selectUser)
  private token: string;
  private myId: number;

  constructor(private http: HttpClient, private store: Store) {
    this.user$.subscribe((user) => {
      this.token = user.token
      this.myId = user.id
    })
  }

  getToken(): Observable<ApiResult> {
    return this.http.get<ApiResult>(`${environment.baseUrl}/sanctum/csrf-cookie`, { observe: 'response' })
  }

  register(registrationData): Observable<ApiResult> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const token = document.cookie
    console.log(token);
    const headers = new HttpHeaders(/*{ 'X-CSRF-TOKEN': ''}*/)
    const requestOptions = {
      headers,
      withCredentials: true
    };
    return this.http.post<ApiResult>(
      `${environment.baseUrl}/api/register`,
      registrationData,
      requestOptions
    )
  }

  login(loginData): Observable<ApiResult> {
    return this.http.post<ApiResult>(
      `${environment.baseUrl}/api/login`,
      loginData
    )
  }

  async getUserData(token: string): Promise<Observable<ApiResult>> {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${token}`
    })
    return this.http.get(`${environment.baseUrl}/api/user`, { headers })
  }

  logOut(): Observable<ApiResult> {
    return this.http.post<ApiResult>(`${environment.baseUrl}/api/logout`, {})
  }

  savePosition(userPositionData): Observable<ApiResult> {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${this.token}`
    })
    return this.http.post<ApiResult>(`${environment.baseUrl}/api/position`, userPositionData, { headers })
  }

  addFriend(friendData): Observable<ApiResult> {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${this.token}`
    })
    return this.http.post<ApiResult>(`${environment.baseUrl}/api/friend`, friendData, { headers })
  }

  getFriends(): Observable<FriendsList> {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${this.token}`
    })
    return this.http.get<FriendsList>(`${environment.baseUrl}/api/friends/${this.myId}`, { headers })
  }

  getPosition(friendId) {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${this.token}`
    })
    return this.http.get<Position>(`${environment.baseUrl}/api/position/${friendId}`, { headers })
  }

  getPositions(friendIds) {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Bearer ${this.token}`
    })
    return this.http.get<Position[]>(`${environment.baseUrl}/api/positions?ids=${friendIds}`, { headers })
  }
}
