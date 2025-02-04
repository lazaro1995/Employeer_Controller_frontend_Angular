import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { RegisterInterface } from '../../../shared/interfaces/auth/register-interface';

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
  constructor(private formBuilder:FormBuilder,private router:Router, private registerService: AuthService){}
  register(){
    if(this.registerForm.valid){
      this.registerService.register(this.registerForm.value as RegisterInterface).subscribe({
        next:(data)=>{

      console.log(data)
            this.router.navigateByUrl('/dashboard')

    }
      })
    }}
}
