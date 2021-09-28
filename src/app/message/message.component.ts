import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  users: any[]
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getAllUsers()

      .subscribe((res: any) => {
        this.users = res.data.document

      })
  }

}
