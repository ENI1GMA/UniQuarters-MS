import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Etudiant } from '../models/etudiant';
import { Observable, Subject, catchError, retry, tap, throwError } from 'rxjs';

const uniQuartersUri = environment.uniQuartersUri + "/etudiants";

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  addEtudiant(e: Etudiant): Observable<HttpResponse<any>> {
    return this.http.post(uniQuartersUri, e, { observe: 'response' })
    .pipe(
      retry(3), catchError(this.handleError),
      tap(() => {
        this._refresh$.next();
      }));
}

  updateEtudiant(e: Etudiant): Observable<HttpResponse<any>> {
    return this.http.put(uniQuartersUri, e, { observe: 'response' })
    .pipe(
      retry(3), catchError(this.handleError),
      tap(() => {
        this._refresh$.next();
      }));
}

  getEtudiants(): Observable<HttpResponse<any>> {
    return this.http.get(uniQuartersUri,{ observe: 'response' }).pipe(retry(3), catchError(this.handleError) )
  }

  getEtudiant(id:number): Observable<HttpResponse<any>> {
    return this.http.get(uniQuartersUri+"/"+id,{ observe: 'response' }).pipe(retry(3), catchError(this.handleError) )
  }

  deleteEtudiant(id:number): Observable<HttpResponse<any>> {
    return this.http.delete(uniQuartersUri+"/"+id,{ observe: 'response' })
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
