import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, RouterModule } from '@angular/router';
import {FormGroup, FormControl,  Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegisterInterface } from '../../interfaces/auth/register-interface';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule,RouterLink, ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  showModal = false;
  registerForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    constructor(private router:Router, private registerService: AuthService){}

  openModal(){
    this.showModal = true;
  }
  closeModal(){
    this.showModal = false;
  }
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
