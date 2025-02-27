import { Component, ChangeDetectionStrategy, OnInit, signal } from '@angular/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { TimecardsService } from '../../../../shared/services/timecards.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DateRangePickerComponent } from '../../../../shared/components/date-range-picker/date-range-picker.component';
import { DatePickerService } from '../../../../shared/services/date-picker.service';
import { EmployeeListComponent } from '../../../../shared/components/employee-list/employee-list.component';
import { ToastrService } from 'ngx-toastr';
import { LocationService } from '../../../../shared/services/location.service';
import { EmployeesServiceService } from '../../../../shared/services/employees.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-employee-hours',
  standalone: true,
  imports: [CommonModule, SweetAlert2Module, FormsModule, ReactiveFormsModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule, DateRangePickerComponent, EmployeeListComponent],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './employee-hours.component.html',
  styleUrl: './employee-hours.component.css',
})
export default class EmployeeHoursComponent implements OnInit {
  constructor(private timecardService: TimecardsService, private route: ActivatedRoute, private router: Router, private employeeService: EmployeesServiceService,
     private datePickerService: DatePickerService, private _formBuilder: FormBuilder, private toast: ToastrService, private location: LocationService) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.employeeService.employee$ = new BehaviorSubject<any>(id);
    this.datePickerService.date$.subscribe(data => {
      this.loadTimecard(id);
    });
    this.employeeService.employee$.subscribe(data => {
      this.changeUrl(this.employeeService.employee$.value)
    });
  }
  
  createPunch = this._formBuilder.group({
    punch_type: ['', Validators.required],
    punch_date: [ '', Validators.required],
    status: ['1',],
    employee_id: [this.employeeService.employee$.value],
    punch_time: ['', Validators.required],
    notes: [''],
  });

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
          punch_date: '',
          punch_type: '',
          qrt: '',
          status: 'No Transactions',
        },
      ],
    },
  ];
  test = '';
  punchDate = '';
  showModal = false;
  showModalNote = false;
  idTimecard = ''
  errorMessage = ''
  locationObtained = false

  changeUrl(id:any){
    this.router.navigate([`/timecard/${id}`])
    this.loadTimecard(id)
  }

  loadTimecard(id: any){
    this.timecardService.findTimecard(id, `dateStart=${this.datePickerService.dateStart}&dateEnd=${this.datePickerService.dateEnd}`).subscribe({
      next: (data) => {
        this.row = data;
      },
    });
  }
  createTimeCard(){
    this.createPunch.value.punch_date = this.punchDate;
     const timecard = 
      {
        punch_type: this.createPunch.value.punch_type,
        punch_date:  this.createPunch.value.punch_date ,
        status: this.createPunch.value.status ,
        employee_id: this.employeeService.employee$.value,
        punch_time: this.createPunch.value.punch_time
      }
 this.location.getLocation().subscribe({
  next: (resp) => {
    if (resp) {
      console.log(resp);
    }
  },
  error: (error) => {
    this.errorMessage = error?.message || "We couldn't get your location. Please enable location permissions and try again";
  },
  complete: () => {
    this.locationObtained = true;
  }
});
    this.timecardService.createTimecard(timecard).subscribe({
      next: (data) => {
        this.toast.success('Timecard Created.', 'Sucess');
      },
      error: (err) =>{
        this.toast.error(err.error.message, 'Error');
      }
    })
    this.closeModal();
    this.ngOnInit()
  }

edit(){
  this.createPunch.value.punch_date = this.punchDate;
     const timecard = 
      {
        punch_type: this.createPunch.value.punch_type,
        punch_date:  this.createPunch.value.punch_date ,
        status: this.createPunch.value.status ,
        employee_id: this.createPunch.value.employee_id,
        punch_time: this.createPunch.value.punch_time
      }
      this.timecardService.updateTimecard(timecard, this.idTimecard).subscribe({
        next: (data) => {
          console.log(timecard)
          this.toast.success('Timecard Updated.', 'Sucess');
        },
        error: (err) =>{
          this.toast.error(err.error.message, 'Error');
        }
      })
      this.closeModal();
      this.ngOnInit()
}

  toggleModal(day: string, edit: boolean, itemable : any, idTimecard: string) {
    this.isEdit = edit
    this.test = day
    this.punchDate = itemable.day
    this.showModal = true;
    this.idTimecard = idTimecard
  }
  closeModal() {
    this.showModal = false
  }
  closeModalNote() {
    this.showModalNote = false;
  }
  toogleModalNote(note: string) {
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
            this.ngOnInit()
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
