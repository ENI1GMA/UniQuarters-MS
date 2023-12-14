import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Observable, Subject, catchError, retry, tap, throwError } from 'rxjs';
import { Role } from '../models/role';

const uniQuartersUri = environment.uniQuartersUri + "/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  addUser(e: User): Observable<HttpResponse<any>> {
    return this.http.post(uniQuartersUri, e, { observe: 'response' })
      .pipe(
        retry(3), catchError(this.handleError),
        tap(() => {
          this._refresh$.next();
        }));
  }

  updateUser(e: User): Observable<HttpResponse<any>> {
    return this.http.put(uniQuartersUri, e, { observe: 'response' })
      .pipe(
        retry(3), catchError(this.handleError),
        tap(() => {
          this._refresh$.next();
        }));
  }

  getUsers(): Observable<HttpResponse<any>> {
    return this.http.get(uniQuartersUri, { observe: 'response' }).pipe(retry(3), catchError(this.handleError))
  }

  getUser(id: string): Observable<HttpResponse<any>> {
    return this.http.get(uniQuartersUri + "/" + id, { observe: 'response' }).pipe(retry(3), catchError(this.handleError))
  }

  deleteUser(id: string): Observable<HttpResponse<any>> {
    return this.http.delete(uniQuartersUri + "/" + id, { observe: 'response' })
      .pipe(
        retry(3), catchError(this.handleError),
        tap(() => {
          this._refresh$.next();
        }));
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    errorMessage =
      error.error instanceof ErrorEvent
        ? `Error: ${error.error.message}`
        : `\nCode: ${error.status}\nMessage: ${error.message}`;
    return throwError(() => new Error(errorMessage));
  }


}
