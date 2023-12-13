import { Component } from '@angular/core';
import { UniversiteService } from 'src/app/services/universite.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  items!: { label: string; routerLink: string; }[];

  constructor(private uniService:UniversiteService) { }
  productTypes = ['Option 1', 'Option 2', 'Option 3'];
  gouvernorats: string[] = this.uniService.getGouvernorats();


  ngOnInit(): void {
this.loadUniversities()
  }
  loadUniversities(){
    this.uniService.getAllUniversites().subscribe(
      (response: any) => {
        this.uniService.data = response.data.universities;
        this.updateMapData();

        console.log(this.uniService.data)
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  updateMapData() {
    // Create a map to store the count of universities for each address
    const universitiesCountMap = new Map<string, number>();

    // Count the universities for each address
    this.uniService.data.forEach(university => {
        const address = university.adresse;

        // Increment the count for the current address
        universitiesCountMap.set(address, (universitiesCountMap.get(address) || 0) + 1);
    });

    // Update the title attribute of each path with the calculated number of universities
    universitiesCountMap.forEach((count, address) => {
        const path = document.querySelector(`[data-address="${address}"]`);
        if (path) {
            path.setAttribute('title', `Number of Universities: ${count}`);
        }
    });
}

}
