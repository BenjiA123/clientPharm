import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {
  constructor(private route: ActivatedRoute, private usersService: UsersService) { }

  currentRoute: any
  currentUserData: any
  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.currentRoute = params['detail']

          this.usersService.getUserByUsername(this.currentRoute)
            .subscribe(
              (currentUser: any) => {
                this.currentUserData = currentUser.data.document
              }
            )

        }
      )

  }

  oneditUser(form: NgForm) {
    if (form.form.status != "VALID") {
      alert("Invalid Form, Please fill all the fields")
      return
    }

    this.usersService.editUser(form.form.value, this.currentUserData._id)
      .subscribe((data: any) => {
        this.currentUserData = data.data.document
      })
  }

}
