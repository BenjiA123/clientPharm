import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer'

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  currentUser: any;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {

    this.store.select('AuthState').subscribe(
      (data) => {

        this.currentUser = data.currentUser
      }
    )
  }

  oneditCustomer(editForm: NgForm) {

    if (editForm.form.status != "VALID") {
      alert("Invalid Form, Please fill all the fields")
      return
    }

    // this.usersService.editCustomer(editForm.form.value, this.currentUserData._id)
    //   .subscribe((data: any) => {
    //     this.currentUserData = data.data.document
    //   })


  }
}