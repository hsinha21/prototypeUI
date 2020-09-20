import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';

import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

import { HomeComponent } from './Components/home/home.component';
import { AddTeamEstimationComponent } from './Components/add-team-estimation/add-team-estimation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material Import Start
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AddTeamEstimationComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpClientModule, NgIdleKeepaliveModule.forRoot(),
    AppRoutingModule, MatCardModule, MatSelectModule, MatTooltipModule, FormsModule, ReactiveFormsModule, MatInputModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatProgressSpinnerModule, MatSlideToggleModule, MatCheckboxModule, MatRadioModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MatProgressBarModule, MatMenuModule
  ],
  exports: [
    MatCardModule, MatSelectModule, MatTooltipModule, FormsModule, ReactiveFormsModule, MatInputModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatProgressSpinnerModule, MatSlideToggleModule, MatCheckboxModule, MatRadioModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MatProgressBarModule, MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
