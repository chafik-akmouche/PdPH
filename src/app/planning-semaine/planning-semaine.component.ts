import { Component, OnInit , Input } from '@angular/core';
import {PlanningFilterService } from '../services/planning-filter.service';

@Component({
  selector: 'app-planning-semaine',
  templateUrl: './planning-semaine.component.html',
  styleUrls: ['./planning-semaine.component.css']
})
export class PlanningSemaineComponent implements OnInit {

  @Input() contrat: string | undefined;
  @Input() agent : string | undefined;
  @Input() creneaux : string[] = []; 
  @Input() nombreSemaine : number; //nombre de semaines que l'on veut afficher récuperer à partir des filtres
  
  constructor(planningFilter : PlanningFilterService) {
    this.nombreSemaine = planningFilter.nombreSemaine;
  }

  ngOnInit(): void {
  }

 

}
