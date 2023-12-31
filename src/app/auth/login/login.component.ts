import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, UntypedFormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthData } from '../auth';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {

  }
  ngOnInit() {
    this.createLoginForm()

  }
  createLoginForm() {
    this.loginForm = this.fb.group({

      log: [''],
      password: [''],

    });
  }

  onSubmit() {
    console.warn('hello', this.loginForm.value)
    this.authService.login(this.loginForm.value).subscribe((response) => {
      const authData: AuthData = {
        token: response.token,
        refresh_token: response.refresh_token,
        expires_in: response.expires_in,
        token_type: response.token_type,
      };

      if (this.authService.initSession(authData.token, authData.refresh_token)) {

        localStorage.setItem(environment.tokenKey, authData.token);
        localStorage.setItem(environment.refreshTokenKey, authData.refresh_token);

      }
      this.router.navigate(['home'])
    })

  }
}
