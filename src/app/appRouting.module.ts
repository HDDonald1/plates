import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnerDataComponent } from './owner-data/owner-data.component';
import { OwnersTableComponent } from './owners-table/owners-table.component';

const routes: Routes = [
  {path: '', component: OwnersTableComponent},
  {path: 'owners/:id', component: OwnerDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
