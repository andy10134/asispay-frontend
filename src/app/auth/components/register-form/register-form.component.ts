import { Component } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../services/auth.service';
import { CustomValidators } from 'src/app/core/validators/custom-validators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  registerForm: FormGroup;
  message: string;
  passwordStatus: string = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notification: NzNotificationService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      confirmEmail: ['', [Validators.email, Validators.required, this.confirmEmailValidator]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), this.confirmPasswordValidator]],
    });

    this.registerForm.addValidators([
      CustomValidators.MatchValidator('email', 'confirmEmail'),
      CustomValidators.MatchValidator('password', 'confirmPassword')
    ]);
  }

  get f() { return this.registerForm.controls; }

  get passwordMatchError() {
    return (
      this.registerForm.getError('mismatch') &&
      this.registerForm.get('confirmPassword')?.touched
    );
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.registerForm.controls['confirmPassword'].updateValueAndValidity());
  }

  get emailMatchError() {
    return (
      this.registerForm.getError('mismatch') &&
      this.registerForm.get('confirmEmail')?.touched
    );
  }

  confirmPasswordValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.registerForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  confirmEmailValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.registerForm.controls['email'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  signup() {
    this.authService.signup(
      {
        email: this.f['email'].value,
        password: this.f['password'].value,
        firstname: this.f['firstname'].value,
        lastname: this.f['lastname'].value,
      }
    ).subscribe(() => this.router.navigate([this.authService.INITIAL_PATH]));
  }

}
