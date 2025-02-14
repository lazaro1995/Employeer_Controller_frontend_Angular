import { Component, OnInit } from '@angular/core';
import { CompanyInterface } from '../../interfaces/company-interface';
import { CompaniesService } from '../../services/companies.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css',
})
export class CompaniesComponent implements OnInit {
  employeeForm = new FormGroup({
    isInactive: new FormControl(''),
    companies: new FormControl('')
  });
  data: any[] = [];
  companies: CompanyInterface[] = [];
  constructor(
    private companyService: CompaniesService,
  ) { }
  ngOnInit(): void {
    this.companyService.getAllCompanies().subscribe({
      next: (data) => {
        this.companies = data.data;
        console.log(data);
      },
    });
  }
  checkToogle(){
    console.log('sdsad')
  }
}