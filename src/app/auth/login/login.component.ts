import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {


  private loadingSub: Subscription
  private isLoading: boolean = false



  constructor(private authService: AuthService, private _snackBar: MatSnackBar) { }



  ngOnInit(): void {
    this.loadingSub = this.authService.getLoadingStatusListener()
      .subscribe(
        (loading) => {
          this.isLoading = loading
          if (this.isLoading) this._snackBar.open("LoAdinG......");
          if (!this.isLoading) this._snackBar.dismiss()

        }
      )

  }

  onLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      return
    }
    this.authService.login(loginForm.value.username, loginForm.value.password)
  }


  ngOnDestroy(): void {
    this.loadingSub.unsubscribe()
  }

}
