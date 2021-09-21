import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  constructor(private authService: AuthService) { }
  signupForm: FormGroup


  public createUserFields: any[] = [
    {
      formControlName: "fullName", placeholder: "Full Name :", type: "string", label: "name"
    },
    {
      formControlName: "username", placeholder: "Username :", type: "username", label: "username"
    },
    {
      formControlName: "email", placeholder: "Email :", type: "email", label: "email"
    },
    {
      formControlName: "phoneNumber", placeholder: "Phone Number :", type: "number", label: "phoneNumber"
    },
    {
      formControlName: "dateOfBirth", placeholder: "Date Of Birth", type: "date", label: "dateOfBirth"
    },

  ]



  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        'fullName': new FormControl(null, [Validators.required, Validators.minLength(4)]),
        'username': new FormControl(null, [Validators.required, Validators.minLength(4),]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'phoneNumber': new FormControl(null, [Validators.required, Validators.min(7), Validators.minLength(7),]),
        'gender': new FormControl(null, Validators.required),
        'dateOfBirth': new FormControl(null, Validators.required),
        'role': new FormControl(null, Validators.required),
      }
    )
  }

  submitForm() {
    if (this.signupForm.status != "VALID") {
      alert("Invalid Form, Please fill all the fields")
      return
    }
    this.signupForm.value.password = 12345678
    this.signupForm.value.confirmPassword = 12345678

    const signUpData = {
      confirmPassword: this.signupForm.value.confirmPassword,
      dateOfBirth: this.signupForm.value.dateOfBirth,
      email: this.signupForm.value.email,
      name: this.signupForm.value.fullName,
      gender: this.signupForm.value.gender,
      password: this.signupForm.value.password,
      phoneNumber: this.signupForm.value.phoneNumber,
      role: this.signupForm.value.role,
      username: this.signupForm.value.username,



    }
    this.authService.createUser(signUpData)
  }

}
