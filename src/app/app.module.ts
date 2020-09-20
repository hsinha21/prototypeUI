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
    AppRoutingModule,FormsModule, ReactiveFormsModule
  ],
  exports: [
    FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
