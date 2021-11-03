import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CsvReader } from "./csvReader.service";

@Injectable()

export class PlanningService{

    static nombreSemaineSelect : number = 1;
    static nw : number = 9;
    public creneaux_Aff : EventEmitter<Creneau[]>;
    public listeNombreS : BehaviorSubject<number>;
    public tab_creneau : Creneau[] = [];
    //public creneaux : Creneau[];

    constructor(private csvReader : CsvReader){
        this.creneaux_Aff = new EventEmitter();
        this.listeNombreS = new BehaviorSubject(PlanningService.nombreSemaineSelect);
        
        //this.creneaux = this.csvReader.getCsvContent();
        //affichage du planning pour une semaine
        this.setCreneauxAffichable(PlanningService.nombreSemaineSelect);
       
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
        },
        {
            contrat : '90%',
            agent : 'Agent 1',
            postes : ['M1','J1','S1','J1','M1','.','.','S1','J1','J1','S1','S1','.','.','J1','S1','J1','J1','J1','.','.','M1','M1','M1','Jca 1-2','J1','.','.','M1','M1','M1','M1','M1','.','.','S1','J1','J1','Jca 0-1','M1','.','.','J1','J1','J1','J1','S1','.','J1','M1','M1','M1','J1','.','.','M1','M1','M1','M1','J1','.','.']
        },
        {
            contrat : '90%',
            agent : 'Agent 2',
            postes : ['M1','J1','S1','J1','M1','.','.','S1','J1','J1','S1','S1','.','.','J1','S1','J1','J1','J1','.','.','M1','M1','M1','Jca 1-2','J1','.','.','M1','M1','M1','M1','M1','.','.','S1','J1','J1','Jca 0-1','M1','.','.','J1','J1','J1','J1','S1','.','J1','M1','M1','M1','J1','.','.','M1','M1','M1','M1','J1','.','.']
        },
        {
            contrat : '80%',
            agent : 'Agent 3',
            postes : ['M1','J1','S1','J1','M1','.','.','S1','J1','J1','S1','S1','.','.','J1','S1','J1','J1','J1','.','.','M1','M1','M1','Jca 1-2','J1','.','.','M1','M1','M1','M1','M1','.','.','S1','J1','J1','Jca 0-1','M1','.','.','J1','J1','J1','J1','S1','.','J1','M1','M1','M1','J1','.','.','M1','M1','M1','M1','J1','.','.']
        }
    ]

    onSelectNombreSemaineChange(nombre : number){
        PlanningService.nombreSemaineSelect = nombre;
        this.listeNombreS.next(PlanningService.nombreSemaineSelect);
        this.setCreneauxAffichable(PlanningService.nombreSemaineSelect);
    }

    
    setCreneauxAffichable(nombre : number){
        let cpt = 7;
        let new_poste : string[] = [];
        let poste_f : string[] = [];
        this.tab_creneau = [];
        let cpt_max = nombre * cpt;
        let i = 0;

        for(let creneaux_agent of this.creneaux){
           while(i <= cpt && cpt <= cpt_max){
               if(i == cpt){
                    new_poste = new_poste.filter( val => val !== '');
                    poste_f = poste_f.concat(new_poste);
                    if(cpt != cpt_max)
                        poste_f.push(" ");
                    new_poste = [];
                    cpt = cpt + 7;
               }
               else{
                   new_poste[i] = creneaux_agent.postes[i];
                   i++;
               }
           }

           this.tab_creneau.push(new Creneau(creneaux_agent.contrat, creneaux_agent.agent,poste_f));
           poste_f = [];
           cpt = 7;
           i = 0;
        }
        this.creneaux_Aff.emit(this.tab_creneau);
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