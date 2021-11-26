import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Drug } from '../drugs/drugs.interface';

import { environment } from "./../../environments/environment";
const BACKEND_URL = environment.apiUrl + "/drug";
@Injectable({
  providedIn: 'root'
})

export class SearchService {
  constructor(private http: HttpClient) { }

  private drugs: Drug[]

  private searchedDrugs = new Subject<{ drugs: Drug[] }>()
  searchForDrugs(searchParams: string) {
    this.http.get(`${BACKEND_URL}/search?q=${searchParams}`)
      .subscribe(
        (res: any) => {
          this.drugs = res.document.data
          this.searchedDrugs.next({ drugs: [...this.drugs] })

        })
  }

  searchedDrugsListener() {
    return this.searchedDrugs.asObservable();
  }

}