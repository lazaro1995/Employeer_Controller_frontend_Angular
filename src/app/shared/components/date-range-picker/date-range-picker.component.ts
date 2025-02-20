import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePickerService } from '../../services/date-picker.service';

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './date-range-picker.component.html',
  styleUrl: './date-range-picker.component.css',
  providers: [DatePipe],
})
export class DateRangePickerComponent implements OnInit {
  readonly range = new FormGroup({
    start: new FormControl<any | null>(null),
    end: new FormControl<Date | null>(null),
  });
ngOnInit(): void {
  console.log(new Date().getDay())
}

  fullDate = new Date();
  formattedDate: string;
  constructor(private datePipe: DatePipe, 
    private datePickerService: DatePickerService) {
    this.formattedDate = this.datePipe.transform(this.fullDate, 'MM/dd/yyyy')!;
  }
  showModal = false;
  dateStart = '';
  dateEnd = '';
  datePicker = 'Previous Pay Period';
  openModal() {
    this.showModal = true;
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
      this.datePickerService.setDateRange(this.dateStart,this.dateEnd);
    }
    else if(date == 'Previous Pay Period'){
      this.datePickerService.setDateRange('0','0');
      this.datePicker = 'Previous Pay Period'
    }
    else{
      this.datePickerService.setDateRange('1','1');
      this.datePicker = 'Current Pay Period'
    }
  }
}
