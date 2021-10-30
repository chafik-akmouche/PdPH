import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  isAuth = false;
  nw : number = 9;

  cycles_agent = [
    {
      contrat : '100%',
      agent : 'Agent 1',
      creneaux : [
                    {
                      semaine : 1,
                      postes : ['M1','J1','S1','J1','M1','.','.']
                    },
                    {
                      semaine : 2,
                      postes : ['S1','J1','J1','S1','S1','.','.']
                    },
                    {
                      semaine : 3,
                      postes : ['J1','S1','J1','J1','J1','.','.']
                    },
                    {
                      semaine : 4,
                      postes : ['M1','M1','M1','Jca 1-2','J1','.','.']
                    },
                    {
                      semaine : 5,
                      postes : ['M1','M1','M1','M1','M1','.','.']
                    },
                    {
                      semaine : 6,
                      postes : ['S1','J1','J1','Jca 0-1','M1','.','.']
                    },
                    {
                      semaine : 7,
                      postes : ['J1','J1','J1','J1','S1','.','.']
                    },
                    {
                      semaine : 8,
                      postes : ['J1','M1','M1','M1','J1','.','.']
                    },
                    {
                      semaine : 9,
                      postes : ['M1','M1','M1','M1','J1','.','.']
                    }

                ],

    },
    {
      contrat : '100%',
      agent : 'Agent 2',
      creneaux : [
                    {
                      semaine : 1,
                      postes : ['M1','J1','S1','J1','M1','.','.']
                    },
                    {
                      semaine : 2,
                      postes : ['S1','J1','J1','S1','S1','.','.']
                    },
                    {
                      semaine : 3,
                      postes : ['J1','S1','J1','J1','J1','.','.']
                    },
                    {
                      semaine : 4,
                      postes : ['M1','M1','M1','Jca 1-2','J1','.','.']
                    },
                    {
                      semaine : 5,
                      postes : ['M1','M1','M1','M1','M1','.','.']
                    },
                    {
                      semaine : 6,
                      postes : ['S1','J1','J1','Jca 0-1','M1','.','.']
                    },
                    {
                      semaine : 7,
                      postes : ['J1','J1','J1','J1','S1','.','.']
                    },
                    {
                      semaine : 8,
                      postes : ['J1','M1','M1','M1','J1','.','.']
                    },
                    {
                      semaine : 9,
                      postes : ['M1','M1','M1','M1','J1','.','.']
                    }

                ],

    },
    {
      contrat : '100%',
      agent : 'Agent 3',
      creneaux : [
                    {
                      semaine : 1,
                      postes : ['M1','J1','S1','J1','M1','.','.']
                    },
                    {
                      semaine : 2,
                      postes : ['S1','J1','J1','S1','S1','.','.']
                    },
                    {
                      semaine : 3,
                      postes : ['J1','S1','J1','J1','J1','.','.']
                    },
                    {
                      semaine : 4,
                      postes : ['M1','M1','M1','Jca 1-2','J1','.','.']
                    },
                    {
                      semaine : 5,
                      postes : ['M1','M1','M1','M1','M1','.','.']
                    },
                    {
                      semaine : 6,
                      postes : ['S1','J1','J1','Jca 0-1','M1','.','.']
                    },
                    {
                      semaine : 7,
                      postes : ['J1','J1','J1','J1','S1','.','.']
                    },
                    {
                      semaine : 8,
                      postes : ['J1','M1','M1','M1','J1','.','.']
                    },
                    {
                      semaine : 9,
                      postes : ['M1','M1','M1','M1','J1','.','.']
                    }

                ],

    }
  ];

  

  constructor(){
    //console.log("tableau Postes ====== " + this.setAgentPostesByNombreSemaineTable(this.getAgentPostesByNombreSemaines('Agent 1', 3)));
  }

  ngOnInit(): void {
    
  }

  getCycleByAgent(agent : string){
    for(let cycle_agent of this.cycles_agent){
      if(cycle_agent.agent == agent){
        return cycle_agent;
        break;
      }
    }

    return null;
  }

  getAgentPostesByNombreSemaines(agent : string, nombre : number){
    let cycle_agent = this.getCycleByAgent(agent);
    let tableau_postes : string[][] = [];

    /*if(cycle_agent != null){
      for (let n = 1; n < nombre; n++) {
        for(let creneau of cycle_agent.creneaux){
          if(creneau.semaine == n){
            return creneau.postes
            break;
          }
        }
        return []; //n'a pas de poste pour cette semaine
      }
    }
    else
      return null //n'a pas de cycle
  }*/

    if(cycle_agent != null && nombre <= this.nw){
      for (let n = 1; n <= nombre; n++) {
        for(let creneau of cycle_agent.creneaux){
          if(creneau.semaine == n){
            tableau_postes[n] = creneau.postes
            break;
          }
        }
      }
    }else{
        return [];
    }

      return tableau_postes;
  }


  setAgentPostesByNombreSemaineTable(tab_postes : string[][]){
    let postes_agent : string[] = [];
    
    for (let i = 0; i < tab_postes.length; i++) {
        postes_agent = postes_agent.concat(tab_postes[i]);
      }

      return postes_agent;
    }

    
}




