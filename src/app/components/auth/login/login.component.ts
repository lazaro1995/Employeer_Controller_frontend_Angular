import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { LoginInterface } from '../../../shared/interfaces/auth/login-interface';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  private tokenKey = 'authToken';
  public listaEmployee = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: AuthService,
    private toast: ToastrService
  ) {}

  login() {
    if (this.loginForm.valid) {
      this.loginService
        .login(this.loginForm.value as LoginInterface)
        .subscribe({
          next: (data) => {
            console.log(data.message);
            if ((data.message = 'Hi lachy')) {
              this.toast.success('Login succesfully.', 'Sucess');
              console.log(data.accessToken);
              console.log(data.user.email);
              this.setToken(data.accessToken, data.user.name);
              this.router.navigateByUrl('/dashboard');
              this.loginForm.reset();
            }
          },
          error: (err) =>{
            this.toast.error('Incorrect credentials.', 'Error');
          }
        });

    } else {
      this.loginForm.markAllAsTouched();
      this.toast.info(' fields missing.', 'Info');
    }
  }
  setToken(token: string, name: string): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem('name', name);
  }
}
