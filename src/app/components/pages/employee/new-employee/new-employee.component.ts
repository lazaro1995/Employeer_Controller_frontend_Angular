import { Component } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';

@Component({
  selector: 'app-new-employee',
  standalone: true,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
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
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    middleName: ['', Validators.required],
    employeeId: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    street: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    postalCode: ['', Validators.required],
    country: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    emergencyContact: ['', Validators.required],
    emergencyPhone: ['', Validators.required],
    notes: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder) {}
}
