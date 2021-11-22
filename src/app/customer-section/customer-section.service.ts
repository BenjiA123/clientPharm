import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "./../../environments/environment";
import { map, switchMap, mergeMap } from "rxjs/operators";
import { BehaviorSubject, Subject } from 'rxjs';
import { Drug } from '../drugs/drugs.interface';


const BACKEND_URL = environment.apiUrl + "/drug";

@Injectable({
  providedIn: 'root'
})
export class CustomerSectionService {

  constructor(private http: HttpClient) { }

  private savedDrugs = new Subject<{ drug: Drug[]; }>();


  ngOnInit() {
  }

  getAllDrugs(limit?: number, sort?: string, page?: number) {
    return this.http.get(`${BACKEND_URL}`).pipe(
      map((res: any) => {

        this.savedDrugs.next(res.data.document)
        return res
      })
    )
  }

  getSavedDrugs() {
    return this.savedDrugs.asObservable();

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

  editCustomer(updatedUser: any, customerId: string) {
    return this.http.patch(`${environment.apiUrl}/user/${customerId}`, updatedUser)
  }
}
