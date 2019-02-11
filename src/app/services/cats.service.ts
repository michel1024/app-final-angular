import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CatsService {
    APIUrl: string = 'https://api.thecatapi.com/v1/images/search';

  constructor(private http: HttpClient) { }

  getImage() {
    return this.http
      .get<Array<{}>>(this.APIUrl)
      .pipe(data => data, catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}