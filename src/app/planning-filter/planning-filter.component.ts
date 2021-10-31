import { Component, OnInit , Input} from '@angular/core';
import {PlanningFilterService } from '../services/planning-filter.service';

@Component({
  selector: 'app-planning-filter',
  templateUrl: './planning-filter.component.html',
  styleUrls: ['./planning-filter.component.css']
})
export class PlanningFilterComponent implements OnInit {

  @Input() nombreSemaine : number;
  listeSemaines : Array<number>;
  nombreSemaineSelect : any; 

  constructor(private planningFilter : PlanningFilterService) {
    this.nombreSemaine = 0;
    this.listeSemaines = [];
  }

  ngOnInit(): void {
    this.listeSemaines = this.generateListeSemaines();
  }

  generateListeSemaines(){
    let liste_nombre_semaine : Array<number> = [];

    for (let  i = 1; i <= this.nombreSemaine; i++) {
      liste_nombre_semaine.push(i)
    }

    return liste_nombre_semaine;
  }

  onSelectNombreSemaineChange($event : any){
    this.planningFilter.onSelectNombreSemaineChange($event.target.value);
  }

  


}
