import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  createPassword(form:NgForm){
    if(form.invalid){
      return
    }

    console.log("Hello World")
  }

}
