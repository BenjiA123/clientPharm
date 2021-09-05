import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "./../../environments/environment";
const BACKEND_URL = environment.apiUrl + "/drug";
@Injectable({
  providedIn: 'root'
})
export class DrugsService {

  constructor(private http:HttpClient) {}

  getAllDrugs(limit?:number,sort?:string,page?:number){
  return this.http.get(`${BACKEND_URL}`)
    
  }

}
