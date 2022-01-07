import { Component, OnInit } from '@angular/core';
import { NgForm, FormControlName } from '@angular/forms';
import { SelectSolution } from '../services/selectSolution.service';
import { CallSolver } from '../services/solverCall.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent {
  nombre_contrats : number;  //le nombre de contrat

  //variables a envoyer pour le lancement du solveur
  file : any; //contiendra le fichier selectionner au lancement du solveur
  tab_data : string[] = []; //l'ensemble des lignes contenu dans le fichier d'entrée
  nb_semaines : number;
  solution_found : string = "";
  btn_clicked : boolean = false;

  list_solutions : string[];
  contrainte11 : boolean; //Nombre minimal de jours consécutifs travaillés 
  contrainte12 : boolean; //Nombre maximal de jours consécutifs travaillés
  contrainte13 : boolean; //Même postes les samedi et dimanche consécutifs
  contrainte14 : boolean; //Postes différents sur deux segments consécutifs 
  contrainte15 : boolean; //Au plus 30% de JCA chaque jour 


  constructor(private CallSolver: CallSolver) {
    this.nb_semaines = 2;
    this.nombre_contrats = 7;
    this.list_solutions = [];
    this.contrainte11 = true;
    this.contrainte12 = true;
    this.contrainte13 = true;
    this.contrainte14 = true;
    this.contrainte15 = true;
  }

  ngOnInit(): void {
    this.subscribeToSolverStateChange();
  }


  subscribeToSolverStateChange(){
    this.CallSolver.solver_state.subscribe(state => {
      this.solution_found = state;
    })
  }

  checkFile(file : string) {
    return (file.endsWith(".txt"));
  }

  public onFileChanged($event:any){
    this.file = $event.target.files[0];
  }


  lancerSolveur(form: NgForm) {
    this.btn_clicked = true;
    let fileReader = new FileReader();
    let str : any = ""; //contient le contenu du fichier d'entrée en string
    let tab_val : string[] = [];


    this.nb_semaines =  form.value["nb_semaines"];
    this.contrainte11 = form.value["contrainte11"];
    this.contrainte12 = form.value["contrainte12"];
    this.contrainte13 = form.value["contrainte13"];
    this.contrainte14 = form.value["contrainte14"];
    this.contrainte15 = form.value["contrainte15"]

    fileReader.onload = (e) => {
      str = fileReader.result?.toString().trim();

      //Appel à la méthode du service qui va envoyer les informations au back
      this.CallSolver.sendDataToSolver(this.nb_semaines,this.file.name,str,this.contrainte11,this.contrainte12,this.contrainte13,this.contrainte14,this.contrainte15);
    }

    fileReader.readAsText(this.file);

  }

}
