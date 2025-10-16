import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';  // corrected import path
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  // declarations: [AppComponent], // Removed as AppComponent is standalone
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  // bootstrap: [AppComponent] // Removed as AppComponent is standalone
})
export class AppModule {}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(ReactiveFormsModule, AppComponent)
  ]
}).catch(err => console.error(err));


