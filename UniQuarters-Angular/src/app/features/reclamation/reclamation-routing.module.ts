import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListReclamationComponent } from './list-reclamation/list-reclamation.component';

const routes: Routes = [
  {path:'',component:ListReclamationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReclamationRoutingModule { }
