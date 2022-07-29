import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private email: string = "";
  private password: string = "";
  public user!: User;
  public fg!: FormGroup;
  private subscriptions: Subscription[] = [];


  constructor(private router: Router, private fb: FormBuilder, private service: UserService) { }

  ngOnInit(): void {
    this.initFormGroup();
  }

  initFormGroup() {
    this.fg = this.fb.group({
      password: new FormControl({ value: null, disabled: false }),
      email: new FormControl({ value: null, disabled: false }),
    })

  }

  goToRegisterPage() {
    this.router.navigate(['/register']);
  }

  loginUser() {
    let formModel: User = Object.assign({}, this.fg.value);
    this.email = formModel.email;
    this.password = formModel.password;

    this.subscriptions.push(this.service.getPerson(this.email).subscribe({
      next: (resp) => {
        this.user = resp
        console.log(resp);
      }
    }))
  }

}
