import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'


export interface ApiResult {
  [x: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private token: string;
  constructor(private http: HttpClient) { }

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

  saveLocation(userLocationData): Observable<ApiResult> {
    console.log(userLocationData);
    return this.http.post<ApiResult>(`${environment.baseUrl}/api/location`, userLocationData)
  }
}
