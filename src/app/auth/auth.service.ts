import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const BACKEND_URL = environment.apiUrl + "/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private loadingStatusListener = new BehaviorSubject<boolean>(false)
  getLoadingStatusListener() {
    return this.loadingStatusListener.asObservable()
  }
  changePassword(password: any) {
    return this.http.patch(`${environment.apiUrl}/user/update-my-password`, password)
  }

}
