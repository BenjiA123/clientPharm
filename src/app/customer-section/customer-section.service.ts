import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "./../../environments/environment";
const BACKEND_URL = environment.apiUrl + "/drug";

@Injectable({
  providedIn: 'root'
})
export class CustomerSectionService {

  constructor(private http: HttpClient) { }


  getAllDrugs(limit?: number, sort?: string, page?: number) {
    return this.http.get(`${BACKEND_URL}`)

  }
  createCheckout(drugId: string) {
    return this.http.get(`${environment.apiUrl}/order/checkout-session/${drugId}`)


  }


  getOneDrug(drugId: string) {
    return this.http.get(`${BACKEND_URL}/${drugId}`)

  }

  getUsersOrderedDrugs() {
    return this.http.get(`${environment.apiUrl}/order/my-ordered-drugs`)
  }

  getUsersOrders() {
    return this.http.get(`${environment.apiUrl}/order/my-orders`)
  }
}
