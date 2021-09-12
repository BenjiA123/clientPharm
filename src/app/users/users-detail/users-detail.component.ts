import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss']
})
export class UsersDetailComponent implements OnInit {

  constructor(private route :ActivatedRoute,private usersService:UsersService) { }

  currentRoute:any
  currentUserData:any
  logoutDates:any[]
  loginDates:any[]
  ngOnInit() {
    this.route.params
    .subscribe(
      (params:Params)=>{
        this.currentRoute = params['detail']

        this.usersService.getUserByUsername(this.currentRoute)
        .subscribe(
          (currentUser:any)=>{
            this.currentUserData = currentUser.data.document
            this.loginDates = this.currentUserData.loginDates
            this.logoutDates  = this.currentUserData.logoutDates
          }
        )

      }
    )

  }

  deleteUser(userId:string){
    console.log(userId)
    // ?Sets user to inActive
  }
}
