import { Component,Input,Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Universite } from 'src/app/models/universite';

@Component({
  selector: 'app-universite-details',
  templateUrl: './universite-details.component.html',
  styleUrls: ['./universite-details.component.scss']
})
export class UniversiteDetailsComponent {
  foyerName!:string;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}
  @Input() uni!:Universite;
  @Output() showUniv = new EventEmitter<Universite>();


  showLocation(univ:Universite){
    this.showUniv.emit(univ);
   console.log(univ)
  }

  goToChambreList(): void {
    // Navigate to another route with the foyerName as a parameter
    this.router.navigate(['/loggedIn/home/GetChambresByFoyer', { foyerId: this.uni.foyer.id }]);
  }

}