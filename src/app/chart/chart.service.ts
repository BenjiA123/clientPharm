import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "./../../environments/environment";
const BACKEND_URL = environment.apiUrl + "/graph";

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) { }

  getTransactionGraphForDuration(startDate: any, endDate: any) {
    return this.http.get(`${BACKEND_URL}/transaction/${startDate}/${endDate}`)

  }
}
