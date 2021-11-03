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

import { ConfigurationComponent } from './configuration/configuration.component';
import { RouterModule, Routes } from '@angular/router';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { CsvReader } from './services/csvReader.service';

const appRoutes : Routes = [
  { path: '', component: PlanningViewComponent },
  { path: 'configuration', component: ConfigurationComponent },
  { path: 'connexion', component: PlanningViewComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    PlanningComponent,
    NavbarComponent,
    PlanningFilterComponent,
    PlanningViewComponent,
    ConfigurationComponent,
    FourOhFourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    PlanningFilterService,
    PlanningService,
    CsvReader
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
