import { EventEmitter } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export class PlanningService{

    static nombreSemaineSelect : number = 1;
    static nw : number = 9;
    public creneaux_Aff : EventEmitter<Creneau>;
    public listeNombreS : BehaviorSubject<number>;

    constructor(){
        this.creneaux_Aff = new EventEmitter();
        this.listeNombreS = new BehaviorSubject(PlanningService.nombreSemaineSelect);
    }

    creneaux = [
        {
            contrat : '100%',
            agent : 'Agent 1',
            postes : ['M1','J1','S1','J1','M1','.','.','S1','J1','J1','S1','S1','.','.','J1','S1','J1','J1','J1','.','.','M1','M1','M1','Jca 1-2','J1','.','.','M1','M1','M1','M1','M1','.','.','S1','J1','J1','Jca 0-1','M1','.','.','J1','J1','J1','J1','S1','.','J1','M1','M1','M1','J1','.','.','M1','M1','M1','M1','J1','.','.']
        },
        {
            contrat : '100%',
            agent : 'Agent 2',
            postes : ['M1','J1','S1','J1','M1','.','.','S1','J1','J1','S1','S1','.','.','J1','S1','J1','J1','J1','.','.','M1','M1','M1','Jca 1-2','J1','.','.','M1','M1','M1','M1','M1','.','.','S1','J1','J1','Jca 0-1','M1','.','.','J1','J1','J1','J1','S1','.','J1','M1','M1','M1','J1','.','.','M1','M1','M1','M1','J1','.','.']
        },
        {
            contrat : '100%',
            agent : 'Agent 3',
            postes : ['M1','J1','S1','J1','M1','.','.','S1','J1','J1','S1','S1','.','.','J1','S1','J1','J1','J1','.','.','M1','M1','M1','Jca 1-2','J1','.','.','M1','M1','M1','M1','M1','.','.','S1','J1','J1','Jca 0-1','M1','.','.','J1','J1','J1','J1','S1','.','J1','M1','M1','M1','J1','.','.','M1','M1','M1','M1','J1','.','.']
        }
    ]

    onSelectNombreSemaineChange(nombre : number){
        PlanningService.nombreSemaineSelect = nombre;
        this.listeNombreS.next(PlanningService.nombreSemaineSelect);
    }

    
    setCreneauxAffichable(nombre : number){
        let cpt = 7;
        let new_poste : string[] = [];

        for(let creneaux_agent of this.creneaux){
            for(let i=1; i < nombre * cpt; i++){
                new_poste[i] = creneaux_agent.postes[i];
            }
            this.creneaux_Aff.emit(new Creneau(creneaux_agent.contrat, creneaux_agent.agent,new_poste));
            new_poste = [];
        }
    }

    getListeSemaine(){
        let liste = [];

        for (let i = 1; i <= PlanningService.nw; i++) {
            liste.push(i);
        }

        return liste;
    }



}

export class Creneau{

    constructor(public contrat: string, public agent: string, public postes: string[]){
    }
}