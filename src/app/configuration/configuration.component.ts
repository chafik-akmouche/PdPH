import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SelectSolution } from '../services/selectSolution.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent {

  file_entree : string;
  nombre_semaine : number;
  contraintes_ignores : string[];

  constructor(private selectSolution : SelectSolution) {
    this.file_entree = "";
    this.nombre_semaine = 0;
    this.contraintes_ignores = [];
  }

  checkFile(file : string) {
    return (file.endsWith(".txt"));
  }


  lancerSolveur(form: NgForm) {
    if(this.checkFile(form.value["inputFile"])){
       // appeler le back
     setTimeout(
       ()=> {
         
       },5000
     );
    }

    //envoie du nombre de semaine a la page de visualisation
    console.log("Nombre semaine configuration : " + form.value["inputSemaine"]);
    
  }

}
