import { Component, OnInit , Input, ViewChild, ElementRef, AfterViewInit, Renderer2} from '@angular/core';
import { NgModel } from '@angular/forms';
import { CsvReader } from '../services/csvReader.service';
import { PlanningService } from '../services/planning.service';
import { SelectSolution } from '../services/selectSolution.service';
import { CallSolver } from '../services/solverCall.service';


@Component({
  selector: 'app-planning-filter',
  templateUrl: './planning-filter.component.html',
  styleUrls: ['./planning-filter.component.css']
})
export class PlanningFilterComponent implements OnInit {
  
  isTypeAgent = false;
  isTypeContrat = false;
  isbtnSemaine = true;
  isbtnJour = false;

  @Input() nombreSemaine : number;

  listeSemaines : Array<number>;
  nombreSemaineSelect: any;
  listeSolutionsNames : string[] ;
  listeContrats : string[];

  constructor(private planningService : PlanningService,
              private selectSolution : SelectSolution, 
              private CallSolver: CallSolver) {

    this.nombreSemaine = 0;
    this.listeSemaines = [];
    this.listeSolutionsNames = [];
    this.listeContrats = [];
  }

  ngOnInit(): void {
    this.listeSemaines = this.generateListeSemaines();
    this.subscribeListSolutionChargement();
  }

 // fonction d'inscription au changement de reception d'une nouvelle liste des solutions après lancement solveur
 private subscribeListSolutionChargement(){
  this.CallSolver.solutions_list.subscribe(Solution =>{
    this.listeSolutionsNames = Solution.split(",");
    this.selectSolution.setSolution(this.listeSolutionsNames);
  })
}

  generateListeSemaines(){
    let liste_nombre_semaine : Array<number> = [];

    for (let  i = 1; i <= this.nombreSemaine; i++) {
      liste_nombre_semaine.push(i)
    }

    return liste_nombre_semaine;
  }

  @ViewChild('content') mon_element:ElementRef | undefined;

  onSelectNombreSemaineChange($event : any){
    this.planningService.onSelectNombreSemaineChange($event.target.value);
    //this.planningService.setCreneauxAffichable($event.target.value);
  }  

  onSolutionSelectChange($event : any){
    this.planningService.onSolutionSelectChange($event.target.value);
  }

  onSelectAfficherParChange($event : any){
    this.planningService.onSelectAfficherParChange($event.target.value);
    
    switch($event.target.value){
      case "typeC" : 
        this.isTypeContrat = true;
        this.isTypeAgent = false;
        //recuperation de la liste des contrats à l'aide du service
        this.listeContrats = this.planningService.selectListeContrat();
      break;
      case "agent":
        this.isTypeAgent = true;
        this.isTypeContrat = false;
      break;
      case "tout":
        this.isTypeAgent = false;
        this.isTypeContrat = false;
      break;
    }

  }

  onSelectTypeContratChange($event : any){
    this.planningService.onTypeContratChange($event.target.value);
  }

  onSelectAgentChange($event : any){
    this.planningService.onSelectAgentChange($event.target.value);
  }


  onSelectJourChange($event : any){

  }

}

