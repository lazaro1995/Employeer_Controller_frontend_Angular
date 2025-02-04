import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute,Router, RouterModule } from '@angular/router';
import { EmployeesServiceService } from '../../../../shared/services/employees.service';
import { initTabs } from 'flowbite';
import {ReactiveFormsModule} from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';
import { Validators, FormBuilder } from '@angular/forms';
import { EmployeeInterface } from '../../../../shared/interfaces/employee-interface';
import { CommonModule } from '@angular/common';
import { RegisterInterface } from '../../../../shared/interfaces/auth/register-interface';


@Component({
  selector: 'app-find-employee',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './find-employee.component.html',
  styleUrl: './find-employee.component.css'
})
export default class FindEmployeeComponent implements OnInit {
  constructor(private route: ActivatedRoute,private router:Router, private employeeService: EmployeesServiceService){}
  employee: EmployeeInterface = { id: 2n,
    first_name: '',
    last_name: '',
    employee_id: 2n,
    company_id: 2n,
    email: '',
    status: 0,
    phone: 2n,
    street: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    emergency_contact: '',
    emergency_phone: 2n

  };
  employeeForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    employee_id: new FormControl(),
    company_id: new FormControl(),
    email: new FormControl(''),
    status: new FormControl(),
    phone: new FormControl(),
    street: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    postal_code: new FormControl(''),
    country: new FormControl(''),
    emergency_contact: new FormControl(''),
    emergency_phone: new FormControl()
  });

  ngOnInit(): void {
    initTabs();
    const id = this.route.snapshot.paramMap.get('id');
    this.employeeService.findEmployee(id!).subscribe({
      next: (data) => {
        this.employee= data.data;
        this.employeeForm.setValue({
          first_name: this.employee.first_name,
          last_name: this.employee.last_name,
          employee_id: this.employee.employee_id,
          company_id: this.employee.company_id,
          status: this.employee.status,
          email: this.employee.email,
          phone: this.employee.phone,
          street: this.employee.street,
          city: this.employee.city,
          state: this.employee.state,
          postal_code: this.employee.postal_code,
          country: this.employee.country,
          emergency_contact: this.employee.emergency_contact,
          emergency_phone: this.employee.emergency_phone,

        });

      },
    });
  }
  updateEmployee(){
      this.employeeService.updateEmployee(this.employeeForm.value, this.employee.id).subscribe({
        next:(data)=>{
      console.log(data)
          this.redirectEmployee();

    }
      })
    }
  redirectEmployee(){
    this.router.navigateByUrl('/employee')
  }
}

