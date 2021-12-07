import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + "/order";

@Injectable({
  providedIn: 'root'
})
export class DispatchRiderSectionService {

  constructor(private http: HttpClient) { }

  getAllOrders(limit?: number, sort?: string, page?: number) {
    return this.http.get(`${BACKEND_URL}`).pipe(
      map((res: any) => {

        return res
      })
    )
  }

  getOneOrder(orderId: string) {
    return this.http.get(`${BACKEND_URL}/${orderId}`)

  }

}
