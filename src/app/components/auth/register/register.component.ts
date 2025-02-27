import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { RegisterInterface } from '../../../shared/interfaces/auth/register-interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });
  private tokenKey = 'authToken';
  constructor(private formBuilder:FormBuilder,private router:Router, private registerService: AuthService, private toast: ToastrService){}
  register(){
    if(this.registerForm.valid){
      this.registerService.register(this.registerForm.value as RegisterInterface).subscribe({
        next:(data)=>{
          this.toast.success('Register succesfully.', 'Sucess');
          this.setToken(data.accessToken, data.user.name);
            this.router.navigateByUrl('/dashboard')
            this.registerForm.reset();
    },
    error: (err) =>{
      this.toast.error(err, 'Error');
    }
  });             
}

}
setToken(token: string, name: string): void {
  localStorage.setItem(this.tokenKey, token);
  localStorage.setItem('name', name);
}
}
