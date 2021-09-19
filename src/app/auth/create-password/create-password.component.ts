import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnInit {

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }


  createPassword(form: NgForm) {
    if (form.invalid) {
      return
    }

    if (form.form.value.password != form.form.value.passwordConfirm) {
      alert("Password and Password Confirm must be equal")
      return
    }

    this.authService
      .createUserPassword(
        this.route.snapshot.params['token'],
        form.form.value.password,
        form.form.value.passwordConfirm).subscribe(
          res => {
            this.router.navigate['/']
          }

        )
  }

}
