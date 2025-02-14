import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class CompaniesService {

  constructor(private globalService: GlobalService) { }
  private readonly _http = inject(HttpClient);

  getAllCompanies(): Observable<any> {
      return this._http.get<any>(
        `${this.globalService.apiUrl}v1/companies`
      );
  }

}
