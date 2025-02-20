import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS, StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { EmployeesServiceService } from '../../../../shared/services/employees.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-employee',
  standalone: true,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
  imports: [MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,],
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.css'
})

export default class NewEmployeeComponent {
  firstFormGroup = this._formBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    middle_name: ['',],
    employee_id: ['', Validators.required],
    company_id : ['2'],
    company: [2],
    status: ['1'],
    client_id: [2],
    street: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    postal_code: ['', Validators.required],
    country: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    emergency_contact: ['', Validators.required],
    emergency_phone: ['', Validators.required],
    notes: ['',],
  });
  constructor(private _formBuilder: FormBuilder, private employeeService: EmployeesServiceService, private toast: ToastrService) { }

  createEmployee() {
    this.employeeService.createEmployee(this.firstFormGroup.value).subscribe({
      next: (data) => {
        this.toast.success('Employee Created.', 'Sucess');
      },
      error: (err) =>{
        this.toast.error(err.error.message, 'Error');
      }
    })
  }

}
