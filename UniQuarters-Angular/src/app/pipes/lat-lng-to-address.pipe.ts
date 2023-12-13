import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'latLngToAddress'
})
export class LatLngToAddressPipe implements PipeTransform {
  private apiUrl = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2';

  constructor(private http: HttpClient) {}

  transform(lat: number, lng: number): Observable<string> {
    const url = `${this.apiUrl}&lat=${lat}&lon=${lng}`;

    return this.http.get<any>(url).pipe(
      map(response => {
        const address = response.display_name || 'Unknown Address';
        return address;
      })
    );
  }

}
