import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HangmanComponent } from './hangman/hangman.component';

const routes: Routes = [
  { path: '', redirectTo: 'hangman', pathMatch: 'full' },
  { path: 'hangman', component: HangmanComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
