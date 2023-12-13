import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFoyersComponent } from './list-foyers/list-foyers.component';

const routes: Routes = [{path:'', component:ListFoyersComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoyersRoutingModule { }
