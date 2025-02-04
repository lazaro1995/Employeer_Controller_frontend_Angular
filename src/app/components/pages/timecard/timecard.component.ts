import { Component } from '@angular/core';
import { initDatepickers } from 'flowbite';
import "flowbite/dist/flowbite.turbo.js";
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  RowSelectionOptions,
} from 'ag-grid-community';
import { EmployeesServiceService } from '../../../shared/services/employees.service';
import { EmployeeInterface } from '../../../shared/interfaces/employee-interface';
import { DateRangePicker } from 'flowbite-datepicker';

// Row Data Interface
interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
  employee: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-timecard',
  standalone: true,
  imports: [AgGridAngular,RouterLink, RouterLinkActive],
  templateUrl: './timecard.component.html',
  styleUrl: './timecard.component.css',
})
export default class TimecardComponent {
  private gridApi!: GridApi;
  constructor(private employeeService: EmployeesServiceService, private router: Router) {}
  ngOnInit(): void {
     initDatepickers();
     DateRangePicker
  }
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
    this.employeeService.getAllEmployees('?status[eq]=1').subscribe({
      next: (data) => {
        this.rowData = data.data;
      },
    });
    // this.rowData = this.rowData;
  }
  doubleClickCell(){
    const selectedData = this.gridApi.getSelectedRows();
    this.router.navigate([`/timecard/${selectedData[0].id}`]);
  }

}
