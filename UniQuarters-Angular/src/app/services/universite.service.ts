import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Universite } from '../models/universite';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Foyer } from '../models/foyer';

@Injectable({
  providedIn: 'root',
})
export class UniversiteService {
  data: Universite[] = [];
  gouvernorats: string[] = [
    'Ariana',
    'Béja',
    'Ben Arous',
    'Bizerte',
    'Gabès',
    'Jendouba',
    'Le Kef',
    'Mahdia',
    'Médenine',
    'Monastir',
    'Nabeul',
    'Sfax',
    'Sousse',
    'Tunis',
  ];
  constructor(private _http: HttpClient) {}
  url = environment.uniQuartersUri + '/universities';
  urlFoyer = environment.uniQuartersUri + '/foyers';

  getAllUniversites(): Observable<Universite[]> {
    return this._http.get<Universite[]>(this.url);
  }

  getAllFoyers(): Observable<Foyer[]> {
    return this._http.get<Foyer[]>(this.urlFoyer);
  }
  getGouvernorats(): string[] {
    return this.gouvernorats;
  }
  addUniversity(body: FormData) {
    console.log(body);
    console.log(body);
    return this._http.post(this.url, body);
  }
  updateUniversity(id: number, body: FormData) {
    return this._http.put(this.url + '/' + id, body);
  }
  deleteUniversity(id: number) {
    console.log(this.url + '/' + id);
    return this._http.delete(this.url + '/' + id);
  }
  fetchUniById(id: number) {
    return this._http.get<Universite>(this.url + '/' + id);
  }
  fetchUnisByAddress(add: String) {
    return this._http.get<Universite>(this.url + '/filtre/' + add);
  }
  fetchUnisByName(nom: String) {
    return this._http.get<Universite>(this.url + '/nom/' + nom);
  }
  fetchUnisByFoyer(nom: String) {
    return this._http.get<Universite>(this.url + '/foyerNom/' + nom);
  }
  search(nom: String, add: String) {
    return this._http.get<Universite>(this.url + '/search/' + nom + '/' + add);
  }
}
