import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

export interface ApiResult {
  [x: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient) { }

  register(registrationData): Observable<ApiResult> {
    return this.http.post<ApiResult>(
      `${environment.baseUrl}/register`,
      registrationData,
    )
  }
}
