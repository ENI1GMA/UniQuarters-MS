import { Injectable } from '@angular/core';
import { Foyer } from '../models/foyer';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoyerService {
  data: Foyer[] = [];
  constructor(private _http: HttpClient) {}
  url = environment.uniQuartersUri + '/foyers';
 // urlFoyer = environment.uniQuartersUri + '/foyers';

 

  getAllFoyers(): Observable<Foyer[]> {
    return this._http.get<Foyer[]>(this.url);
  }
  
  addFoyer(body: Foyer) {
    console.log(body);
    console.log(body);
    return this._http.post(this.url, body);
  }
  updateFoyer(id: number, body: Foyer) {
    return this._http.put(this.url + '/' + id, body);
  }
  deleteFoyer(id: number) {
    console.log(this.url + '/' + id);
    return this._http.delete(this.url + '/' + id);
  }
  fetchUniById(id: number) {
    return this._http.get<Foyer>(this.url + '/' + id);
  }
  fetchFoyersByName(nom: String) {
    return this._http.get<Foyer>(this.url + '/nom/' + nom);
  }
}
