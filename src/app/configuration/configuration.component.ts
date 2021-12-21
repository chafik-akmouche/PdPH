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
  Ratio_base : number[]; //la liste des contrats
  Ratio_dim_base: number[];  //la liste de pourcentages des dimanches travaillés 
  h_max: number; //Nombre max d'heures par semaine
  hg_max: number; //Nombre max d'heures par 7 jours glissants
  OffD: number; //Nombre max d'heures par 7 jours glissants
  RepH: number; //Nombre min d'heures de repos
  Contrainte1 : boolean; // respect des besoins
  Contrainte2: boolean; //Un poste par jour



  constructor(private selectSolution : SelectSolution, private CallSolver: CallSolver) {
    this.nb_semaines = 2;
    this.nombre_contrats = 7;
    this.h_max = 45; 
    this.hg_max = 48; 
    this.OffD = 12; 
    this.RepH=36;
    this.Contrainte2 = true;
    this.Contrainte1 = true;
    this.Ratio_base = [1,0.9,0.8,0.75,0.7,0.6,0.5];
    this.Ratio_dim_base = [1,1,1,0.75,0.75,0.6,0.6];
  }

  checkFile(file : string) {
    return (file.endsWith(".txt"));
  }

  /** fonction permettant d'initialiser en cas de changement du nombre des contrat:
   *  la liste des contrats et la liste des pourcentage des dimanches travaillé **/
  onNombreContratChange($event:any){
    this.nombre_contrats = $event.target.value;
    this.Ratio_base = [];
    this.Ratio_dim_base = [];

    for(let i = 0; i < this.nombre_contrats;i++){
      this.Ratio_base.push(0);
      this.Ratio_dim_base.push(0);
    }
  }

  public onFileChanged($event:any){
    this.file = $event.target.files[0];
  }


  lancerSolveur(form: NgForm) {
    let fileReader = new FileReader();
    let str : any = ""; //contient le contenu du fichier d'entrée en string
    let tab_val : string[] = [];


    this.nb_semaines =  form.value["nb_semaines"];
    this.h_max = form.value["h_max"];
    this.hg_max = form.value["hg_max"];
    this.OffD = form.value["OffD"];
    this.Contrainte2 = form.value["contrainte2"];

    fileReader.onload = (e) => {
      str = fileReader.result?.toString().trim();
      //Appel à la méthode du service qui va envoyer les informations au back
      this.CallSolver.sendDataToSolver(this.nb_semaines,str,this.h_max,this.hg_max,this.OffD,this.RepH,this.Contrainte1,this.Contrainte2);
    }

    fileReader.readAsText(this.file);
  }

}
