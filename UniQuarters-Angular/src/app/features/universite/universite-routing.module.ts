import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUniversiteComponent } from './list-universite/list-universite.component';
import { UniversiteDetailsComponent } from './universite-details/universite-details.component';
import { ListUniversiteFilteredComponent } from './list-universite-filtered/list-universite-filtered.component';

const routes: Routes = [
  {path:'', component:ListUniversiteComponent},
  {path:'details', component:UniversiteDetailsComponent},
 



 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniversiteRoutingModule { }
