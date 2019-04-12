import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HangmanComponent } from './hangman/hangman.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { HmButtonDirective } from './hm-button.directive';
import { BtnFormatPipe } from './btn-format.pipe';
import { CounterComponent } from './counter/counter.component';

@NgModule({
  declarations: [
    AppComponent,
    HangmanComponent,
    HmButtonDirective,
    BtnFormatPipe,
    CounterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
