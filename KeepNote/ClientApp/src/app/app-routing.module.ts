import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditNoteOpenerComponent } from './note-components/edit-note-opener/edit-note-opener.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent },
  //{ path: 'dashboard/edit/:noteId', component: EditNoteOpenerComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'note/:noteId/edit',
        component: EditNoteOpenerComponent,
        //outlet: 'noteEditOutlet'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
