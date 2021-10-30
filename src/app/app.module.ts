import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlanningComponent } from './planning/planning.component';

import { PlanningFilterService} from './services/planning-filter.service';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { PlanningFilterComponent } from './planning-filter/planning-filter.component';
import { PlanningSemaineComponent } from './planning-semaine/planning-semaine.component';
@NgModule({
  declarations: [
    AppComponent,
    PlanningComponent,
    NavbarComponent,
    PlanningFilterComponent,
    PlanningSemaineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    PlanningFilterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
