import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

const BACKEND_URL = environment.apiUrl + "/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loadingStatusListener = new BehaviorSubject<boolean>(false)
  getLoadingStatusListener() {
    return this.loadingStatusListener.asObservable()
  }


}
