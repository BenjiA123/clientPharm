import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
        'fullName':new FormControl(null, [Validators.required, Validators.minLength(4)]),
        'username':new FormControl(null, [Validators.required, Validators.minLength(4),]),
        'email':new FormControl(null, [Validators.required,Validators.email]),
        'phoneNumber':new FormControl(null, [Validators.required, Validators.min(7), Validators.minLength(7),]),
        'gender':new FormControl(null, Validators.required),
        'dateOfBirth':new FormControl(null, Validators.required),
        'role':new FormControl(null, Validators.required),
      }
    )
  }

  submitForm(){
    console.log(this.signupForm.errors)
    this.signupForm.value.password = 12345678
    this.signupForm.value.confirmPassword = 12345678
    console.log(this.signupForm)
  }

}
