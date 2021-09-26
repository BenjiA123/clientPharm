import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthGuard } from '../auth/auth.gaurd';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {


  public permitted = false

  public dashboardData: any[] = [

    {
      title: 'Message', subtitle: 'Interact directly with users', icon: 'chat', description: 'Send them direct messages with emails', link: "message"
    },
    {
      title: 'Sources', subtitle: 'Get all vendors', icon: 'home', description: 'Get all your sources at a go', link: "sources"
    },
    {
      title: 'Transactions', subtitle: 'Contact Users', icon: 'MessageIcon', description: 'Monitor the statuses of all your transactions', link: "transactions"
    },
    {
      title: 'Charts', subtitle: 'View your graphs', icon: 'chart', description: 'View how transactions change with the grephs', link: "charts"
    },
    {
      title: 'Users', subtitle: 'Get all Users', icon: 'user', description: 'Gets everyone using your application', link: "users"
    },
    {
      title: 'Create', subtitle: 'Create Sources and drugs', icon: 'add', description: 'Create drugs and sources with ease', link: "create"
    },
    {
      title: 'Sign Up', subtitle: 'Create Employees', icon: 'MessageIcon', description: 'Create Your team of employees', link: "/auth/create-user"
    },
    {
      title: 'Drugs', subtitle: 'Create Transactions', icon: 'MessageIcon', description: 'Creates Users Transactions from Drugs', link: "/drugs"
    },
  ]

  private roleListenerSubs: Subscription
  private userRole = '';

  constructor(private authService: AuthService) {

    this.roleListenerSubs = this.authService.getRoleStatusListener().subscribe(
      (userRole) => {
        this.userRole = userRole
        console.log(userRole == 'MD')
      }
    )


  }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    this.roleListenerSubs.unsubscribe()

  }

}
