import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer'
import * as AuthActions from '../store/auth.actions'
import { User } from '../auth.user.interface';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  public createCustomerFields: any[] = [
    {
      name: "name", placeholder: "Name", type: "text", label: "Name"
    },
    {
      name: "address", placeholder: "Address", type: "textarea", label: "Address"
    },
    {
      name: "username", placeholder: "Username", type: "text", label: "username"
    },
    {
      name: "email", placeholder: "Email :", type: "email", label: "email"
    },
    {
      name: "phoneNumber", placeholder: "Phone Number :", type: "number", label: "phoneNumber"
    },
    {
      name: "dateOfBirth", placeholder: "Date Of Birth :", type: "date", label: "dateOfBirth"
    },

    // Role is by default cashier

  ]

  ngOnInit(): void {
  }


  oncreateCustomer(customerForm: NgForm) {
    if (customerForm.form.status != "VALID") {
      alert("Invalid Form, Please fill all the fields")
      return
    }
    customerForm.form.value.password = 12345678
    customerForm.form.value.confirmPassword = 12345678

    const signUpData: User = {
      confirmPassword: customerForm.form.value.confirmPassword,
      dateOfBirth: customerForm.form.value.dateOfBirth,
      email: customerForm.form.value.email,
      name: customerForm.form.value.name,
      gender: customerForm.form.value.gender,
      password: customerForm.form.value.password,
      phoneNumber: customerForm.form.value.phoneNumber,
      role: "customer",
      username: customerForm.form.value.username,



    }

    this.store.dispatch(new AuthActions.SendCreateUserEmail(signUpData));
  }

}
