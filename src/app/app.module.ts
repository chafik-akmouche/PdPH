import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlanningComponent } from './planning/planning.component';

import { PlanningFilterService} from './services/planning-filter.service';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { PlanningFilterComponent } from './planning-filter/planning-filter.component';
import { PlanningService } from './services/planning.service';
import { PlanningViewComponent } from './planning-view/planning-view.component';
@NgModule({
  declarations: [
    AppComponent,
    PlanningComponent,
    NavbarComponent,
    PlanningFilterComponent,
    PlanningViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    PlanningFilterService,
    PlanningService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
