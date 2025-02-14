import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { CompaniesComponent } from '../companies/companies.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, SweetAlert2Module, CommonModule,CompaniesComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent{
  localName = localStorage.getItem('name');
  showModal = true;
  constructor(private router: Router) {}
  logout(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to close the session?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, close session!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('authToken');
        this.router.navigateByUrl('/login');
        Swal.fire({
          title: 'Come back soon!',
          text: 'Session ended',
          icon: 'success',
        });
      }
    });
  }
}
