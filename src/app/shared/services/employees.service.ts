import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesServiceService {

  constructor(private globalService: GlobalService) { }
  private readonly _http = inject(HttpClient);
  public employee$ = new BehaviorSubject<any>('');
  
  getAllEmployees(data : string): Observable<any> {

      return this._http.get<any>(
        `${this.globalService.apiUrl}v1/employees${data}`
      );
  }


  findEmployee(id : string){
    return this._http.get<any>(
      `${this.globalService.apiUrl}v1/employees/${id}`
    );
  }
  updateEmployee(employee : any, id:any){
    console.log(employee)
    return this._http.patch<any>(
      `${this.globalService.apiUrl}v1/employees/${id}`,employee
    );
  }
  createEmployee(employee: any){
    return this._http.post(`${this.globalService.apiUrl}v1/employees/`,employee)
  }
  // createHeaders(){
  //   return{
  //     headers: new HttpHeaders({
  //       Authorization :`Bearer ${localStorage.getItem('authToken')}`
  //     })
  //   }
  // }
}
