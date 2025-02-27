import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CompaniesService } from '../../services/companies.service';
import { EmployeesServiceService } from '../../services/employees.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  myControl = new FormControl('');
  options: any[] = [];
  filteredOptions!: Observable<any[]>;

  ngOnInit() {
    this.companiesService.company$.subscribe(data => {
      this.loadEmployee()
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  company = this.companiesService.company$.value;
  constructor(private employeeService: EmployeesServiceService, private companiesService: CompaniesService) { }

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();
    return [...new Set(this.options.filter(option => option.name?.toLowerCase().includes(filterValue)))];
  }
  loadEmployee() {
    this.company = this.companiesService.company$.value
    this.options = [];
    if (this.company === 'AllCompanies') {
      this.employeeService.getAllEmployees('?status[eq]=1').subscribe({
        next: (data) => {
          for (const item of data.data) {
            this.options.push({
              id: item.id, 
              name: item.first_name + ' ' + item.last_name
            })
          }
        },
      });
    }
    else {
      this.employeeService.getAllEmployees(`?status[eq]=1&&company[eq]=${this.company}`).subscribe({
        next: (data) => {
          for (const item of data.data) {
            this.options.push({
              id: item.id, 
              name: item.first_name + ' ' + item.last_name
            })
          }
        },
      });
    }
  }
  employeeSelected(option: any) {
    this.employeeService.employee$.next(option.option.id)
  }
}
