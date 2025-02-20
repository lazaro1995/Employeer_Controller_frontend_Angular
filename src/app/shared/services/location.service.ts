import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }
  getLocation(): Observable<any> {
    return this.checkGeolocationPermission().pipe(
      switchMap(permissionStatus => {
        if (permissionStatus === 'granted') {
          return this.getCurrentLocation();
        } else {
          return throwError(() => ({ message: 'Geolocation not available or not allowed.' }));
        }
      }),
      catchError(error => throwError(() => new Error('Location could not be obtained: ' + error.message)))
    );
  }
 
  private checkGeolocationPermission(): Observable<string> {
    return new Observable<string>(observer => {
      navigator.permissions.query({ name: 'geolocation' }).then(status => {
        observer.next(status.state);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }
 
  private getCurrentLocation(): Observable<any> {
    return new Observable(observer => {
      if (!navigator.geolocation) {
        observer.error(new Error('Your browser does not support geolocation.'));
        return;
      }
 
      navigator.geolocation.getCurrentPosition(
        position => {
          observer.next(position.coords);
          observer.complete();
        }
      );
    });
  }
}
