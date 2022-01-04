import { Component, OnInit } from '@angular/core';
import { CallSolver, SolveurParam } from '../services/solverCall.service';

@Component({
  selector: 'app-parameters-view',
  templateUrl: './parameters-view.component.html',
  styleUrls: ['./parameters-view.component.css']
})
export class ParametersViewComponent implements OnInit {

  solveurParams !: SolveurParam;

  constructor(private callSolver : CallSolver) {

  }

  ngOnInit(): void {
    this.subscribeSolverParamsChargement();
  }

  private subscribeSolverParamsChargement(){
    this.callSolver.solveurParams.subscribe(solveurParams => {
      if(solveurParams){
        this.solveurParams = solveurParams;
      }
    })
  }

}
