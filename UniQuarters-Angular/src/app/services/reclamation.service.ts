import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, retry, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reclamation } from '../models/reclamation';

const url = environment.uniQuartersUri + '/reclamations';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  addReclamation(e: Reclamation): Observable<HttpResponse<any>> {
    return this.http.post(url, e, { observe: 'response' })
      .pipe(
        retry(3), catchError(this.handleError),
        tap(() => {
          this._refresh$.next();
        }));
  }

  updateReclamation(e: Reclamation): Observable<HttpResponse<any>> {
    return this.http.put(url, e, { observe: 'response' })
      .pipe(
        retry(3), catchError(this.handleError),
        tap(() => {
          this._refresh$.next();
        }));
  }

  getReclamations(): Observable<HttpResponse<any>> {
    return this.http.get(url, { observe: 'response' }).pipe(retry(3), catchError(this.handleError))
  }

  getReclamation(id: number): Observable<HttpResponse<any>> {
    return this.http.get(url + "/" + id, { observe: 'response' }).pipe(retry(3), catchError(this.handleError))
  }

  deleteReclamation(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(url + "/" + id, { observe: 'response' })
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
