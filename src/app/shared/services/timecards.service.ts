import { Injectable, inject } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimecardsService {
  constructor(private globalService: GlobalService) {}
  private readonly _http = inject(HttpClient);

  getAllTimecards(data: string): Observable<any> {
    return this._http.get<any>(
      `${this.globalService.apiUrl}v1/timecards${data}`
    );
  }
  findTimecard(id: string, data:string) {
    return this._http.get<any>(
      `${this.globalService.apiUrl}v1/timecards/${id}?${data}`
    );
  }
  deleteTimecard(id: string) {
    return this._http.delete<any>(
      `${this.globalService.apiUrl}v1/timecards/${id}`, {"body": {"id": id}}
    );
  }
}
