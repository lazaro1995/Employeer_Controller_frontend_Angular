import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginInterface } from '../interfaces/auth/login-interface';
import { RegisterInterface } from '../interfaces/auth/register-interface';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private globalService: GlobalService) {}
  private readonly _http = inject(HttpClient);

  login(credentials: LoginInterface): Observable<any> {
    return this._http.post<Response>(
      `${this.globalService.apiUrl}login`,
      credentials
    );
  }

  register(credentials: RegisterInterface): Observable<any> {
    return this._http.post<Response>(
      `${this.globalService.apiUrl}register`,
      credentials
    );
  }
}
