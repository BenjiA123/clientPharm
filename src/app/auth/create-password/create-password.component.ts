import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import * as fromApp from '../../store/app.reducer'
import * as AuthActions from '../store/auth.actions'

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnInit {

  constructor(private authService: AuthService, private store: Store<fromApp.AppState>, private route: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar) { }

  private loadingSub: Subscription
  private isLoading: boolean = false

  ngOnInit(): void {
    this.loadingSub = this.authService.getLoadingStatusListener()
      .subscribe(
        (loading) => {
          console.log(this.isLoading)
          this.isLoading = loading
          if (this.isLoading) this._snackBar.open("LoAdinG......");
          if (!this.isLoading) this._snackBar.dismiss()

        }
      )

  }


  createPassword(form: NgForm) {
    if (form.invalid) {
      return
    }

    if (form.form.value.password != form.form.value.passwordConfirm) {
      alert("Password and Password Confirm must be equal")
      return
    }


    this.store.dispatch(new AuthActions.CreateUserPassword({ token: this.route.snapshot.params['token'], password: form.form.value.password, confirmPassword: form.form.value.passwordConfirm }))

    // this.authService
    //   .createUserPassword(
    //     this.route.snapshot.params['token'],
    //     form.form.value.password,
    //     form.form.value.passwordConfirm).subscribe(
    //       res => {
    //         this.authService.automaticLogin()
    //         this.isLoading = false
    //       }

    //     )
  }

}
