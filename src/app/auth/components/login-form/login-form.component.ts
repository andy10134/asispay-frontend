import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoginRequest } from 'src/app/models/loginRequest';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @ViewChild('notification') public templateref: TemplateRef<any>;
  loginForm: FormGroup;
  message:string;

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notification: NzNotificationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]]
    });
  }

  // loginForm = new FormGroup({
  //   email: new FormControl('', [Validators.email, Validators.required]),
  //   password: new FormControl('', Validators.minLength(8))
  // });

  get f() { return this.loginForm.controls; }

  login() {
    const loginRequest: LoginRequest = {
      email: this.f['email'].value,
      password: this.f['password'].value
    };

      this.authService.login(loginRequest)
        .subscribe({
          next: (user) => {
            this.router.navigate([this.authService.INITIAL_PATH]);
          },
          error: (e) => {
            this.message = e.error.message;
            this.notification.template(this.templateref);
          }
        });
  }

}
