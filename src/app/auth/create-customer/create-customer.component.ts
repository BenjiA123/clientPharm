import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {

  constructor() { }

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
      name: "password", placeholder: "Password :", type: "password", label: "password"
    },
    {
      name: "passwordConfirm", placeholder: "Confirm Password :", type: "password", label: "passwordConfirm"
    },
    // Role is by default cashier

  ]

  ngOnInit(): void {
  }


  oncreateCustomer(customerForm: NgForm) {
    console.log(customerForm)
  }
}
