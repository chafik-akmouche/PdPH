import { Component, Injectable, Input, OnInit } from '@angular/core';
import { CsvReader } from '../services/csvReader.service';
import { Creneau, PlanningService } from '../services/planning.service';
import { CallSolver } from '../services/solverCall.service';

@Component({
  selector: 'app-planning-view',
  templateUrl: './planning-view.component.html',
  styleUrls: ['./planning-view.component.css']
})

export class PlanningViewComponent implements OnInit {

  isAuth = false;
  
  nw : number = 9;
  public creneaux_agents_affiche !: Creneau[];
  nombreSemaineSelect : number = 1;
  typeAffichageSelect : string = "tout";
  liste_jour: string[];
  postes : string[]; //répresente la liste de poste a afficher sur chaque page

  @Input() solutionSelect : string = "Cycle_Obj1.xlsx"; //solution recuperer à partir du filtre

  //variables pour la pagination

  constructor(private planningService : PlanningService, private solveurCaller : CallSolver){
    planningService.creneaux_Aff.subscribe(creneaux => this.onCreneauAdded(creneaux));
    this.liste_jour = [];
    this.postes = [];
  }
 
  ngOnInit(): void {
    this.solveurCaller.getDefaultSolutionsName(); // récuperation de la liste des noms des derniers solutions obtenus

    this.subscribeChargementListeSolution(); //souscription du component au chargement de la liste des solutions à partir du back

    this.inscriptionChangementListeSemaine();

    this.inscriptionChangementListeSolution();

    this.inscriptionChangementListeTypeAffichage();

    this.incriptionChangementListeTypeContrat();

    this.inscriptionChangementListeAgent();

    this.subscribeListCreneauChange();
  }

  /**** les methodes d'inscriptions aux changements des filtres ****/

  private inscriptionChangementListeSemaine(){
    this.planningService.listeNombreS.subscribe(n => {
        this.nombreSemaineSelect = n;
        this.generateListeDate(this.nombreSemaineSelect);
    })
  }

  private subscribeChargementListeSolution(){
    this.solveurCaller.solutions_list.subscribe(solutions_noms => {
      //appelle recupération de la solution avec l'elément selectionné par defaut
      if(solutions_noms){
        this.solveurCaller.getSolutionContent(solutions_noms.split(",")[0]);
      }
      else
        console.log("null");
    })
  }

  private inscriptionChangementListeSolution(){
    this.planningService.listeSolution.subscribe(name => {
      let creneaux : Creneau[] = [];

      //creneaux = this.planningService.getFileContent(name)

      //Appelle au back pour la recupération du contenu du nom du fichier solution selectionné 
            
      this.solveurCaller.getSolutionContent(name);

      /*setTimeout(
        ()=>{
          this.planningService.creneaux = creneaux;
          this.planningService.creneaux_triee = creneaux;
          this.planningService.setCreneauxAffichable(this.nombreSemaineSelect,this.typeAffichageSelect,this.planningService.creneaux);
        }, 1000
      ) */
     
    })
  }

  private subscribeListCreneauChange(){
    this.solveurCaller.creneaux_list.subscribe(creneaux => {
        this.planningService.creneaux = creneaux;
        this.planningService.setCreneauxAffichable(this.nombreSemaineSelect,this.planningService.typeAffichageSelect,creneaux);
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

  private onCreneauAdded( creneau : Creneau[]){ //cette fonction récupére a chaque fois le nouveau tableau de créneau a afficher                                             //selon les filtres appliqués
    this.creneaux_agents_affiche = creneau;
  }

  //cette methode doit 
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

  onChangePage($event : any){

  }
}
