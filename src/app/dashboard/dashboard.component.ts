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
      title: 'Transactions', subtitle: 'Contact Users', icon: 'shopping_cart', description: 'Monitor your transaction statuses within your pharmacy', link: "transactions"
    },
    {
      title: 'Message', subtitle: 'Interact directly with users', icon: 'chat', description: 'Chat In realtime with everyone', link: "message"
    },
    {
      title: 'Sources', subtitle: 'Get all vendors', icon: 'play_for_work', description: 'Get all your sources at a go', link: "sources"
    },
    {
      title: 'Charts', subtitle: 'View your graphs', icon: 'timeline', description: 'View how transactions change over a duration with graphs', link: "charts"
    },
    {
      title: 'Users', subtitle: 'Get all Users', icon: 'perm_identity', description: 'Get all your Employees and customers', link: "users"
    },
    {
      title: 'Create', subtitle: 'Create Sources and drugs', icon: 'add', description: 'Create drugs and sources with ease', link: "create"
    },
    {
      title: 'Sign Up', subtitle: 'Create Employees', icon: 'login', description: 'Create Your team of employees', link: "auth/create-user"
    },
    {
      title: 'Drugs', subtitle: 'Create Transactions', icon: 'bubble_chart', description: 'Creates Users Transactions from Drugs', link: "drugs"
    },
    {
      title: 'Dispatch', subtitle: 'Dispatch Page', icon: ' location_on', description: 'A dispatch rider component', link: "dispatch-rider"
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
