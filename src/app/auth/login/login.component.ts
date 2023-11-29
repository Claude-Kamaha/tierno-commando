import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, UntypedFormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
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

      email: [''],
      password: [''],

    });
  }

  onSubmit() {
    console.log(this.loginForm.value)
    this.authService.login(this.loginForm.value).subscribe((response) => {

      this.router.navigate(['client'])


    })

  }
}
