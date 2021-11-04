import { Component, OnInit , Input, ViewChild, ElementRef, AfterViewInit, Renderer2} from '@angular/core';
import { CsvReader } from '../services/csvReader.service';
import { PlanningService } from '../services/planning.service';
import { SelectSolution, Solution } from '../services/selectSolution.service';


@Component({
  selector: 'app-planning-filter',
  templateUrl: './planning-filter.component.html',
  styleUrls: ['./planning-filter.component.css']
})
export class PlanningFilterComponent implements OnInit {

  @Input() nombreSemaine : number;
  listeSemaines : Array<number>;
  nombreSemaineSelect: any;
  listeSolutions : Solution[] ;

  @ViewChild('content')
  content!: ElementRef;

  constructor(private planningService : PlanningService, private renderer: Renderer2,
              private selectSolution : SelectSolution, private csvReader : CsvReader) {
    this.nombreSemaine = 0;
    this.listeSemaines = [];
    this.listeSolutions = [];
  }

  ngOnInit(): void {
    this.listeSemaines = this.generateListeSemaines();
    this.getListSolution();
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


  getListSolution(){ 
    for(let solution of this.selectSolution.getSolutions()){
      this.listeSolutions.push(solution);
    }
  }

  onSolutionSelectChange($event : any){
    this.planningService.onSolutionSelectChange($event.target.value);
  }

 
}

