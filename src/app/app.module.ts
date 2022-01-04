import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { PlanningFilterComponent } from './planning-filter/planning-filter.component';
import { PlanningService } from './services/planning.service';
import { PlanningViewComponent } from './planning-view/planning-view.component';

import { CsvReader } from './services/csvReader.service';
import { HttpClientModule } from '@angular/common/http';

import { ConfigurationComponent } from './configuration/configuration.component';
import { RouterModule, Routes } from '@angular/router';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { SelectSolution } from './services/selectSolution.service';
import { CallSolver } from './services/solverCall.service';

//le module de pagination
import {NgxPaginationModule} from 'ngx-pagination';
import { ParametersViewComponent } from './parameters-view/parameters-view.component';

const appRoutes : Routes = [
  { path: 'plannings', component : PlanningViewComponent},
  { path: 'configuration', component: ConfigurationComponent },
  { path: 'connexion', component: PlanningViewComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '', component: PlanningViewComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PlanningFilterComponent,
    PlanningViewComponent,
    ConfigurationComponent,
    FourOhFourComponent,
    ParametersViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgxPaginationModule
  ],
  providers: [
    PlanningService,
    CsvReader,
    SelectSolution,
    CallSolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
