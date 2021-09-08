import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const BACKEND_URL = environment.apiUrl + "/transaction";

@Injectable({
  providedIn: 'root'
})
export class AppTransactionService {

  // public 

  constructor(private http:HttpClient) {}

  createPendingTransaction(pendingTrans:any){
    return this.http.post(`${BACKEND_URL}/`,pendingTrans)
  }

  getAllTransaction(){
    return this.http.get(`${BACKEND_URL}/`)
  }

}
