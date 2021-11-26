import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DialogMessageComponent } from 'src/app/dialog-message/dialog-message.component';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss']
})
export class UsersDetailComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private usersService: UsersService, private _dialog: MatDialog) { }

  currentRoute: any
  currentUserData: any
  logoutDates: any[]
  loginDates: any[]
  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.currentRoute = params['detail']

          this.usersService.getUserByUsername(this.currentRoute)
            .subscribe(
              (currentUser: any) => {
                this.currentUserData = currentUser.data.document
                this.loginDates = this.currentUserData.loginDates
                this.logoutDates = this.currentUserData.logoutDates
              }
            )

        }
      )

  }

  deleteUser(userId: string) {
    // ?Sets user to inActive
    if (!confirm("Are you sure about this")) return
    this.usersService.inactivateUser(userId)
      .subscribe(
        res => {
          this._dialog.open(DialogMessageComponent, {
            data: { message: "User deactivated" }
          })

          this.router.navigate(['/users'])

        }

      )
  }
}
