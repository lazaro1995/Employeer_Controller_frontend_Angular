import { Injectable } from '@angular/core';
import moment from 'moment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DatePickerService {
  numberDays = new Date().getDay() + 6
  numberDaysOff = 7 - new Date().getDay()
  todayStartPrevious = moment(new Date)
  todayEndPrevious = moment(new Date)
  dateStartPrevious = this.todayStartPrevious.subtract(this.numberDays + 14, 'day').format('YYYY-MM-DD');
  dateEndPrevious = this.todayEndPrevious.add(this.numberDaysOff, 'day').subtract(14, 'day').format('YYYY-MM-DD');
  dateStart?: string = this.dateStartPrevious
  dateEnd?: string = this.dateEndPrevious
  public date$ = new BehaviorSubject<any>('Previous Pay Period');
  dateType = 'Previous Pay Period'
  
  constructor() { }
 
  setDateRange(dateStart: string, dateEnd: string, dateType: string) {
    this.dateStart = dateStart
    this.dateEnd = dateEnd
    this.dateType = dateType
  }


}
