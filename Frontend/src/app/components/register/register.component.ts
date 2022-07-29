import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user!: User;
  public fg!: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private fb: FormBuilder, private service: UserService) { }

  ngOnInit(): void {
    this.initFormGroup();
  }

  initFormGroup() {
    this.fg = this.fb.group({
      fullname: new FormControl({ value: null, disabled: false }, Validators.required),
      password: new FormControl({ value: null, disabled: false }, Validators.required),
      email: new FormControl({ value: null, disabled: false }, Validators.required),
      idNumber: new FormControl({ value: null, disabled: false }, Validators.required),
    })

  }

  goToLoginPage() {
    this.router.navigate(['/login']);
  }

  registerNewUser() {
    let formModel: User = Object.assign({}, this.fg.value);
    this.user = new User();
    this.user.id = 0;
    this.user.fullname = formModel.fullname;
    this.user.password = formModel.password;
    this.user.email = formModel.email;
    this.user.idNumber = (formModel.idNumber).toString();

    this.subscriptions.push(
      this.service.registerNewUser(this.user).subscribe({
        next: (resp) => {
          this.router.navigate(['/login']);
        }
      })
    )
  }

}
