import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-chambre-review',
  templateUrl: './chambre-review.component.html',
  styleUrls: ['./chambre-review.component.scss']
})
export class ChambreReviewComponent {
  @Input() review : number =0
  value: number =5;

  constructor() {
    console.log(this.review)
   }

   ngOnInit(): void {
    console.log(this.review)

  }

}
