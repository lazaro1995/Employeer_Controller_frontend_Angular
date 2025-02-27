import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePickerService } from '../../services/date-picker.service';
import moment from 'moment';
@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './date-range-picker.component.html',
  styleUrl: './date-range-picker.component.css',
  providers: [DatePipe],
})
export class DateRangePickerComponent implements OnInit{
  readonly range = new FormGroup({
    start: new FormControl<any | null>(null),
    end: new FormControl<Date | null>(null),
  });
  ngOnInit(): void {
    this.setRange()
    this.changeDatePicker(this.datePickerService.dateType)
  }
  numberDays = new Date().getDay() + 6
  numberDaysOff = 7 - new Date().getDay()
  todayStartPrevious = moment(new Date)
  todayEndPrevious = moment(new Date)
  todayStartCurrent = moment(new Date)
  todayEndCurrent = moment(new Date)
  fullDate = new Date();
  formattedDate: string;
  showModal = false;
  dateStartPrevious = this.todayStartPrevious.subtract(this.numberDays + 14, 'day').format('YYYY-MM-DD');
  dateEndPrevious = this.todayEndPrevious.add(this.numberDaysOff, 'day').subtract(14, 'day').format('YYYY-MM-DD');
  dateStartCurrent = this.todayStartCurrent.subtract(this.numberDays, 'day').format('YYYY-MM-DD');
  dateEndCurrent = this.todayEndCurrent.add(this.numberDaysOff, 'day').format('YYYY-MM-DD');
  dateStart = this.dateStartPrevious;
  dateEnd = this.dateEndPrevious;
  datePicker = '';
 
  constructor(private datePipe: DatePipe,
    private datePickerService: DatePickerService) {
    this.formattedDate = this.datePipe.transform(this.fullDate, 'MM/dd/yyyy')!;
  }
  
  setRange(){
    this.datePicker = this.datePickerService.dateType
  }

  openModal() {
      this.showModal = !this.showModal;
  }

  closeModal(date: any) {
    this.showModal = false;
    this.changeDatePicker(date);
  }

  changeDatePicker(date: string) {
    if (date == 'Custom') {
      this.dateEnd = this.datePipe.transform(this.range.value.end, 'yyyy-MM-dd')!;
      this.dateStart = this.datePipe.transform(this.range.value.start, 'yyyy-MM-dd')!;
      this.datePicker = this.dateStart + ' to ' + this.dateEnd;
    }
    else if (date == 'Current Pay Period') {
      this.datePicker = 'Current Pay Period'
      this.dateStart = this.dateStartCurrent;
      this.dateEnd = this.dateEndCurrent;
    }
    else {
      this.datePicker = 'Previous Pay Period'
      this.dateStart = this.dateStartPrevious;
      this.dateEnd = this.dateEndPrevious;
    }
    this.datePickerService.setDateRange(this.dateStart, this.dateEnd, this.datePicker);
    this.datePickerService.date$.next(this.datePicker)
  }
}
