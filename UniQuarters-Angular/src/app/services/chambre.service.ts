import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Chambre } from '../models/chambre';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class ChambreService {

    constructor(private fb: FormBuilder, public httpClient: HttpClient) { }

    chambres: Chambre[] = [];
    private apiUrl = `${environment?.uniQuartersUri}/chambres`;
    AddOrEditChambreForm = this.fb.group({
        id: [0],
        numero: ['', [Validators.required, Validators.pattern(/^[0-9]{3,}$/)]],
        capacity: [0],
        description: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
        type: ['', Validators.required],
        wifi: [false],
        airConditioning: [false],
        privateBathroom: [false],
        balcony: [false],
        workspace: [false],
        kitchenette: [false],
        petFriendly: [false],
        travaux: [false],
        idBloc: ['']
    });
    blocForm = this.fb.group({
        selectedBloc: ['', Validators.required],
    });
    retrieveChambres(nomBloc?: string): Observable<HttpResponse<Chambre[]>> {
        const url = `${this.apiUrl}?nomBloc=${nomBloc || ''}`;
        return this.httpClient.get<Chambre[]>(url, { observe: 'response' })
            .pipe(retry(3), catchError(this.handleError));
    }

    addChambre(chambre: Chambre): Observable<HttpResponse<Chambre>> {
        return this.httpClient
            .post<Chambre>(this.apiUrl, chambre, { observe: 'response' })
            .pipe(retry(3), catchError(this.handleError));
    }

    updateChambre(id: number, chambre: Chambre): Observable<HttpResponse<Chambre>> {
        const url = `${this.apiUrl}/${id}`;
        return this.httpClient.put<Chambre>(url, chambre, { observe: 'response' })
            .pipe(retry(3), catchError(this.handleError));
    }

    retrieveChambre(idChambre: number): Observable<HttpResponse<Chambre>> {
        const url = `${this.apiUrl}/${idChambre}`;
        return this.httpClient.get<Chambre>(url, { observe: 'response' })
            .pipe(retry(3), catchError(this.handleError));
    }

    affecterChambreABloc(idChambre: number, nomBloc: string): Observable<HttpResponse<Chambre>> {
        const url = `${this.apiUrl}/affecterABloc/${idChambre}/${nomBloc}`;
        return this.httpClient.post<Chambre>(url, {}, { observe: 'response' })
            .pipe(retry(3), catchError(this.handleError));
    }

    getAvailableChambres(): Observable<HttpResponse<Chambre[]>> {
        const url = `${this.apiUrl}/available`;
        return this.httpClient.get<Chambre[]>(url, { observe: 'response' })
            .pipe(retry(3), catchError(this.handleError));
    }

    getChambresByType(type: string): Observable<HttpResponse<Chambre[]>> {
        const url = `${this.apiUrl}/byType?type=${type}`;
        return this.httpClient.get<Chambre[]>(url, { observe: 'response' })
            .pipe(retry(3), catchError(this.handleError));
    }

    getChambresWithReservations(): Observable<HttpResponse<Chambre[]>> {
        const url = `${this.apiUrl}/withReservations`;
        return this.httpClient.get<Chambre[]>(url, { observe: 'response' })
            .pipe(retry(3), catchError(this.handleError));
    }
    deleteChambre(idChambre: number): Observable<HttpResponse<any>> {
        const url = `${this.apiUrl}/${idChambre}`;
        return this.httpClient.delete(url, { observe: 'response' })
            .pipe(retry(3), catchError(this.handleError));
    }
    handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error!';
        errorMessage =
            error.error instanceof ErrorEvent
                ? `Error: ${error.error.message}`
                : `\nCode: ${error.status}\nMessage: ${error.message}`;
        return throwError(errorMessage);
    }
}