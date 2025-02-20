import { Component, OnInit } from '@angular/core';
import { EmployeesServiceService } from '../../../shared/services/employees.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { CompanyInterface } from '../../../shared/interfaces/company-interface';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  RowSelectionOptions,
} from 'ag-grid-community';
import { EmployeeInterface } from '../../../shared/interfaces/employee-interface';
import { CompaniesService } from '../../../shared/services/companies.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ CommonModule,RouterLink,RouterLinkActive,AgGridAngular,ReactiveFormsModule,FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export default class EmployeeComponent {
  employeeForm = new FormGroup({
    isInactive: new FormControl(false),
    companies: new FormControl('')
  });
  data: any[] = [];
  public idEmployee = 0;
  private gridApi!: GridApi;
  constructor(
    private router: Router,
    private employeeService: EmployeesServiceService,
    private companyService: CompaniesService
  ) {}
  themeClass = 'ag-theme-quartz';
  pagination = true;
  paginationPageSize = 100;
  paginationPageSizeSelector = [25, 50, 100];
  defaultColRef: ColDef = {
    flex: 1,
    // editable: true,
    filter: true,
    // floatingFilter: true,
  };
  public rowSelection: RowSelectionOptions | 'single' | 'multiple' = {
    mode: 'singleRow',
  };
  // Row Data: The data to be displayed.
  rowData: EmployeeInterface[] = [];
  companies: CompanyInterface[]= [];
  // Column Definitions: Defines & controls grid columns.
  colDefs: ColDef<EmployeeInterface>[] = [
    { field: 'id' },
    { field: 'first_name' },
    { field: 'last_name' },
    { field: 'employee_id' },
    { field: 'company_id' },
  ];
  onFilterTextBoxChanged() {
    this.gridApi.setGridOption(
      'quickFilterText',
      (document.getElementById('filter-text-box') as HTMLInputElement).value
    );
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.companyService.company$.subscribe(data => {
      this.checkToogle();
    });
  }
  doubleClickCell(){
    const selectedData = this.gridApi.getSelectedRows();
    this.idEmployee = selectedData[0].id;
    this.router.navigate([`/employee/${selectedData[0].id}`]);
  }
  checkToogle(){
    this.employeeForm.value.companies = this.companyService.company$.value
    if(this.employeeForm.value.isInactive){
      if(this.employeeForm.value.companies == 'AllCompanies'){
        this.employeeService.getAllEmployees('').subscribe({
          next: (data) => {
            this.rowData = data.data;
          },
        });
      }
      else{
        this.employeeService.getAllEmployees(`?company[eq]=${this.employeeForm.value.companies}`).subscribe({
          next: (data) => {
            this.rowData = data.data;
          },
        });
      }
    }

    else{
      if(this.employeeForm.value.companies == 'AllCompanies'){
        this.employeeService.getAllEmployees(`?status[eq]=1`).subscribe({
          next: (data) => {
            this.rowData = data.data;
          },
        });
      }
      else{
        this.employeeService.getAllEmployees(`?status[eq]=1&&company[eq]=${this.employeeForm.value.companies}`).subscribe({
          next: (data) => {
            this.rowData = data.data;
          },
        });
      }
    }
  }

}
