import { HttpClient, } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.scss'],
})
export class DrugsComponent     implements OnInit {
  constructor(private httpClient:HttpClient) {}

  ngOnInit() {
    this.httpClient.get("http//:localhost/5000/api/v1/drugs")
    .subscribe(res =>console.log(res))
    console.log('GRUGS');
  }
}
