import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  signupForm:FormGroup
  
  constructor() {}

  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        'fullName':new FormControl(),
        'username':new FormControl(),
        'email':new FormControl(),
        'phone':new FormControl(),
        'gender':new FormControl(),
        'dateOfBirth':new FormControl(),
        'role':new FormControl(),
      }
    )
  }

  submitForm(){
    console.log(this.signupForm)
  }

}
