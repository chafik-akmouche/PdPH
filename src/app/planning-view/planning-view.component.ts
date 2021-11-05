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
  typeAffichageSelect : string = "tout";
  liste_jour: string[];

  constructor(private planningService : PlanningService){
    planningService.creneaux_Aff.subscribe(creneaux => this.onCreneauAdded(creneaux));
    this.liste_jour = [];
  }
 
  ngOnInit(): void {
    
    this.inscriptionChangementListeSemaine();

    this.inscriptionChangementListeSolution();

    this.inscriptionChangementListeTypeAffichage();

    this.incriptionChangementListeTypeContrat();

    this.inscriptionChangementListeAgent();
  }

  /**** les methodes d'inscriptions aux changements des filtres ****/

  
  private inscriptionChangementListeSemaine(){
    this.planningService.listeNombreS.subscribe(n => {
      this.nombreSemaineSelect = n;
      this.generateListeDate(this.nombreSemaineSelect);
    })
  }

  private inscriptionChangementListeSolution(){
    this.planningService.listePath.subscribe(path => {
      let creneaux : Creneau[] = [];

      creneaux = this.planningService.getFileContent(path)
      
      setTimeout(
        ()=>{
          this.planningService.creneaux = creneaux;
          this.planningService.creneaux_triee = creneaux;
          this.planningService.setCreneauxAffichable(this.nombreSemaineSelect,this.typeAffichageSelect,this.planningService.creneaux);
        }, 1000
      ) 
     
    })
  }

  private inscriptionChangementListeTypeAffichage(){
    this.planningService.listeTypeAff.subscribe( type => {
      //modifier le tableau a afficher 
      //affichage d'un nouveau component pour la selection du type
      this.typeAffichageSelect = type;
      this.planningService.creneaux_triee = this.planningService.creneaux;
      this.planningService.setCreneauxAffichable(this.nombreSemaineSelect,this.typeAffichageSelect,this.planningService.creneaux_triee);
    })
  }

  private incriptionChangementListeTypeContrat(){
    this.planningService.listeTypeContrat.subscribe(
      contrat => {
        if(contrat == "tout")
          this.planningService.creneaux_triee = this.planningService.creneaux;
        else
          this.planningService.creneaux_triee = this.planningService.creneaux.filter( c => c.contrat == contrat);
        
        this.planningService.setCreneauxAffichable(this.nombreSemaineSelect,this.typeAffichageSelect,this.planningService.creneaux_triee);
      }
    )
  }

  private inscriptionChangementListeAgent() {
    this.planningService.listeAgent.subscribe(
      agent => {
        if(agent == "")
          this.planningService.creneaux_triee = this.planningService.creneaux;
        else
          this.planningService.creneaux_triee = this.planningService.creneaux.filter( c => c.agent.indexOf(agent) > -1);

        this.planningService.setCreneauxAffichable(this.nombreSemaineSelect,this.typeAffichageSelect,this.planningService.creneaux_triee);
      }
    )
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
