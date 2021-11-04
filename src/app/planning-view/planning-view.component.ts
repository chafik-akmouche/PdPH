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
  public creneaux_agents_affiche !: Creneau[]; //les creneaux a afficher selon la semaine selectionnée
  nombreSemaineSelect : number = 1;
  fileSelect : string = "assets/solutions/fichier-1";
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

    this.planningService.listePath.subscribe(path => {
      let creneaux : Creneau[] = [];
      this.fileSelect = path;

      creneaux = this.planningService.getFileContent(this.fileSelect)
      
      setTimeout(
        ()=>{
          this.planningService.creneaux = creneaux;
          this.planningService.setCreneauxAffichable(this.nombreSemaineSelect);
        }, 1000
      )

      
     
    })
  }

  private onCreneauAdded( creneau : Creneau[]){
    this.creneaux_agents_affiche = creneau;
  }

  generateListeDate(nombre : number){
    let jours = ["lun","mar","mer","jeu","vend","sam","dim"];
    this.liste_jour = [];
    for(let i = 1; i <= nombre; i++){
      if(i < nombre){
        this.liste_jour = this.liste_jour.concat(jours);
        this.liste_jour.push(" ");
      }
      else
          this.liste_jour = this.liste_jour.concat(jours);
    }
  }
}
