import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnInit {

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar) { }

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

    console.log(this.route.snapshot.params['token'])
    this.authService
      .createUserPassword(
        this.route.snapshot.params['token'],
        form.form.value.password,
        form.form.value.passwordConfirm).subscribe(
          res => {
            this.authService.automaticLogin()
            this.router.navigate['/customer/drugs']
            this.isLoading = false
          }

        )
  }

}
