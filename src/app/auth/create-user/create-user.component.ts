import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  signupForm: FormGroup

  private loadingSub: Subscription
  private isLoading: boolean = false
  constructor(private authService: AuthService, private _snackBar: MatSnackBar) { }

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






    this.loadingSub = this.authService.getLoadingStatusListener()
      .subscribe(
        (loading) => {
          this.isLoading = loading
          if (this.isLoading) this._snackBar.open("LoAdinG......");
          if (!this.isLoading) this._snackBar.dismiss()

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
