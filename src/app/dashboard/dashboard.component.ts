import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {



  public dashboardData: any[] = [

    {
      title: 'Transactions', subtitle: 'Contact Users', icon: 'MessageIcon', description: 'Monitor your transaction statuses within your pharmacy', link: "transactions"
    },
    // {
    //   title: 'Message', subtitle: 'Interact directly with users', icon: 'chat', description: 'Send them direct messages with emails', link: "message"
    // },
    {
      title: 'Sources', subtitle: 'Get all vendors', icon: 'home', description: 'Get all your sources at a go', link: "sources"
    },
    {
      title: 'Charts', subtitle: 'View your graphs', icon: 'chart', description: 'View how transactions change over a duration with graphs', link: "charts"
    },
    {
      title: 'Users', subtitle: 'Get all Users', icon: 'user', description: 'Get all your Employees and customers', link: "users"
    },
    {
      title: 'Create', subtitle: 'Create Sources and drugs', icon: 'add', description: 'Create drugs and sources with ease', link: "create"
    },
    {
      title: 'Sign Up', subtitle: 'Create Employees', icon: 'MessageIcon', description: 'Create Your team of employees', link: "auth/create-user"
    },
    {
      title: 'Drugs', subtitle: 'Create Transactions', icon: 'MessageIcon', description: 'Creates Users Transactions from Drugs', link: "drugs"
    },
  ]

  public userRole: string;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('AuthState').subscribe(
      (data) => {
        let curUser: any = data.currentUser
        this.userRole = curUser?.role;

      }
    )
  }
}
