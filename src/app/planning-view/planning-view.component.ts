import { Component, Injectable, OnInit } from '@angular/core';
import { CsvReader } from '../services/csvReader.service';
import { Creneau, PlanningService } from '../services/planning.service';

@Component({
  selector: 'app-planning-view',
  templateUrl: './planning-view.component.html',
  styleUrls: ['./planning-view.component.css']
})

export class PlanningViewComponent implements OnInit {

  isAuth = false;
  nw : number = 9;
  public creneaux_agents!: Creneau;
  nombreSemaineSelect : number = 1;
  liste_jour: string[];

  constructor(private planningService : PlanningService){
    planningService.creneaux_Aff.subscribe(creneaux => this.onCreneauAdded(creneaux));
    this.liste_jour = [];
  }

  ngOnInit(): void {
    this.planningService.listeNombreS.subscribe(n => {
      this.nombreSemaineSelect = n;
      this.generateListeDate(this.nombreSemaineSelect);
    })
  }


  private onCreneauAdded( creneau : Creneau){
    this.creneaux_agents = creneau;
  }

  generateListeDate(nombre : number){
    let jours = ["lun","mar","mer","jeu","vend","sam","dim"];
    this.liste_jour = [];
    for(let i = 1; i <= nombre; i++){
      this.liste_jour = this.liste_jour.concat(jours);
    }
  }
}
