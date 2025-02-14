import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DatePickerService {
  
  constructor() { }
  dateStart ?: string
  dateEnd ?: string
  setDateRange(dateStart: string, dateEnd : string){
   this.dateStart = dateStart
   this.dateEnd = dateEnd

  }  
  

}
