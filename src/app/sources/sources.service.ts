import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from "./../../environments/environment";
const BACKEND_URL = environment.apiUrl + "/source";

@Injectable({
  providedIn: 'root'
})
export class SourcesService {

  constructor(private http: HttpClient) { }

  getAllSources(limit?: number, sort?: string, page?: number) {
    return this.http.get(`${BACKEND_URL}`)

  }

  createSource(source: {}) {
    return this.http.post(`${BACKEND_URL}`, source)

  }
}
