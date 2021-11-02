import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit , Input, ViewChild, ElementRef, AfterViewInit, Renderer2} from '@angular/core';
import {PlanningFilterService } from '../services/planning-filter.service';
import { PlanningService } from '../services/planning.service';


@Component({
  selector: 'app-planning-filter',
  templateUrl: './planning-filter.component.html',
  styleUrls: ['./planning-filter.component.css']
})
export class PlanningFilterComponent implements OnInit {

  @Input() nombreSemaine : number;
  listeSemaines : Array<number>;
  nombreSemaineSelect: any;

  @ViewChild('content')
  content!: ElementRef;

  constructor(private planningService : PlanningService, private renderer: Renderer2) {
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

  @ViewChild('content') mon_element:ElementRef | undefined;

  onSelectNombreSemaineChange($event : any){
    this.planningService.onSelectNombreSemaineChange($event.target.value);
    this.planningService.setCreneauxAffichable($event.target.value);
  }  
 
}

