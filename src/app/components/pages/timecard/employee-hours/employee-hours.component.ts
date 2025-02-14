import { Component, ChangeDetectionStrategy, OnInit, signal } from '@angular/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { TimecardsService } from '../../../../shared/services/timecards.service';
import { ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CompaniesComponent } from '../../../../shared/components/companies/companies.component';
import { DateRangePickerComponent } from '../../../../shared/components/date-range-picker/date-range-picker.component';
import { DatePickerService } from '../../../../shared/services/date-picker.service';
import { EmployeeListComponent } from '../../../../shared/components/employee-list/employee-list.component';
@Component({
  selector: 'app-employee-hours',
  standalone: true,
  imports: [CommonModule, SweetAlert2Module, MatFormFieldModule, MatInputModule, MatDatepickerModule, CompaniesComponent, DateRangePickerComponent,EmployeeListComponent],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './employee-hours.component.html',
  styleUrl: './employee-hours.component.css',
})
export default class EmployeeHoursComponent implements OnInit {
  constructor(private timecardService: TimecardsService, private route: ActivatedRoute, private datePickerService: DatePickerService) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.timecardService.findTimecard(id!, `dateStart=${this.datePickerService.dateStart}&dateEnd=${this.datePickerService.dateEnd}`).subscribe({
      next: (data) => {
        this.row = data;
      },
    });
  }
  
  isEdit: boolean = false;
  ishover: boolean = false;

  public row = [
    {
      day: '',
      data: [
        {
          id: '',
          name: '',
          punch_time: '',
          punch_type: '',
          qrt: '',
          status: 'No Transactions',
        },
      ],
    },
  ];
  test = '';
  showModal = false;
  showModalNote = false;
  toggleModal(day: string, edit: boolean) {
    this.isEdit = edit
    this.test = day
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false
  }
  closeModalNote() {
    this.showModalNote = false;
  }
  toogleModalNote(note: string) {
    console.log(note);
    this.showModalNote = true;
  }
  delete(idTimeCard: string) {

    Swal.fire({
      title: 'Are you sure, you want to delete?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,  Delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.timecardService.deleteTimecard(idTimeCard).subscribe({
          next: (data) => {
            Swal.fire({
              title: 'Deleted!',
              icon: 'success',
            });
          },
        });

      }
    });
  }
  isRowHovered(isHover: boolean) {
    this.ishover = isHover;
  }
  events = signal<string[]>([]);
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(this.events.update(events => [...events, `${type}: ${event.value}`]));
  }
}
