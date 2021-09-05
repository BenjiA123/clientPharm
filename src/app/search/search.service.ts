import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Drug } from '../drugs/drugs.interface';
// import { Socket } from 'ngx-socket-io';
// import { map } from 'rxjs/operators';

import { environment } from "./../../environments/environment";
const BACKEND_URL = environment.apiUrl + "/drug";
@Injectable({
  providedIn: 'root'
})

export class SearchService {
  // constructor(private socket: Socket) {}
  constructor(private http:HttpClient) {}

  private drugs:Drug[]

  private searchedDrugs = new Subject<{drugs:Drug[]}>()
  // sendDrug(drug: string) {
  //   this.socket.emit('drug', drug);
  // }
  searchDrugs(searchParams:string) {
   this.http.get(`${BACKEND_URL}/search?q=${searchParams}`)
   .subscribe(
     (res:any)=>
   {
    this.drugs = res.document.data
    this.searchedDrugs.next({drugs:[...this.drugs]})
    
    })
    // return this.socket.fromEvent('getDrugs').pipe(map((data:any) => data.msg));
  }

  searchedDrugsListener() {
    return this.searchedDrugs.asObservable();
  }

}