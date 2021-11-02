import { Component, OnInit , Input } from '@angular/core';
import { PlanningService } from '../services/planning.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {
  @Input() agent : string | undefined;
  @Input() contrat : string | undefined;
  @Input() postes : string[];
 
  constructor(public planningService : PlanningService){
    this.postes = [];
  }

  ngOnInit(): void {
  }
  
}




