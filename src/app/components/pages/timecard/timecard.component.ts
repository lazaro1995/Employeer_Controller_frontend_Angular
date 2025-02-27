import { Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { initDatepickers } from 'flowbite';
import "flowbite/dist/flowbite.turbo.js";
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { DateRangePickerComponent } from '../../../shared/components/date-range-picker/date-range-picker.component';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  RowSelectionOptions,
} from 'ag-grid-community';
import { EmployeesServiceService } from '../../../shared/services/employees.service';
import { EmployeeInterface } from '../../../shared/interfaces/employee-interface';
import { DateRangePicker } from 'flowbite-datepicker';
import { DatePickerService } from '../../../shared/services/date-picker.service';
import { CompaniesService } from '../../../shared/services/companies.service';



@Component({
  selector: 'app-timecard',
  standalone: true,
  imports: [AgGridAngular,CommonModule, DateRangePickerComponent ],
  templateUrl: './timecard.component.html',
  styleUrl: './timecard.component.css',
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [provideNativeDateAdapter() ],
})
export default class TimecardComponent {
  private gridApi!: GridApi;
  message: string = ''
  constructor(private employeeService: EmployeesServiceService, private router: Router, private datePickerService: DatePickerService,private companiesService:  CompaniesService) {
  }
  ngOnInit(): void {
     initDatepickers();
     DateRangePicker
  }
  company = this.companiesService.company$.value;
  themeClass = 'ag-theme-quartz';
  pagination = true;
  paginationPageSize = 100;
  paginationPageSizeSelector = [10, 25, 100];
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
    this.companiesService.company$.subscribe(data => {
      this.loadEmployee()
    });
    
    // this.rowData = this.rowData;
  }
  doubleClickCell(){
    const selectedData = this.gridApi.getSelectedRows();
    this.router.navigate([`/timecard/${selectedData[0].id}`]);
  }
  loadEmployee(){
    this.company = this.companiesService.company$.value
    if(this.company === 'AllCompanies'){
      this.employeeService.getAllEmployees('?status[eq]=1').subscribe({
        next: (data) => {
          this.rowData = data.data;
        },
      });
    }
    else{
      this.employeeService.getAllEmployees(`?status[eq]=1&&company[eq]=${this.company}`).subscribe({
        next: (data) => {
          this.rowData = data.data;
        },
      });
    }
  }

}
