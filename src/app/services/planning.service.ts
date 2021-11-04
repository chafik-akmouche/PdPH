import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CsvReader } from "./csvReader.service";

@Injectable()

export class PlanningService{

    private nombreSemaineSelect : number = 1;
    private fichierSelect : string = 'assets/solutions/fichier-1.csv';
    private nw : number = 9; //nombre de semaine lu a partir des données de configuration
    public creneaux_Aff : EventEmitter<Creneau[]>;
    public listeNombreS : BehaviorSubject<number>;
    public creneaux : Creneau[] = [];
    public listePath : BehaviorSubject<string>;

    constructor(private csvReader : CsvReader){
        this.creneaux_Aff = new EventEmitter();
        this.listeNombreS = new BehaviorSubject(this.nombreSemaineSelect);
        this.listePath = new BehaviorSubject(this.fichierSelect); 

       this.creneaux = [];

       this.setCreneauxAffichable(this.nombreSemaineSelect);
    }

    /*creneaux = [
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
    ]*/

    onSelectNombreSemaineChange(nombre : number){
        this.nombreSemaineSelect = nombre;
        this.listeNombreS.next(this.nombreSemaineSelect);
        this.setCreneauxAffichable(this.nombreSemaineSelect);
    }

    
    setCreneauxAffichable(nombre : number){
        let cpt = 7;
        let new_poste : string[] = [];
        let poste_f : string[] = [];
        let tab_creneau : Creneau[] = [];
        let cpt_max = nombre * cpt;
        let i = 0;

        for(let creneaux_agent of  this.creneaux){

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

           tab_creneau.push(new Creneau(creneaux_agent.contrat, creneaux_agent.agent,poste_f));
           poste_f = [];
           cpt = 7;
           i = 0;
        }
        //console.log(this.creneaux);
        this.creneaux_Aff.emit(tab_creneau);
    }

    getListeSemaine(){
        let liste = [];

        for (let i = 1; i <= this.nw; i++) {
            liste.push(i);
        }

        return liste;
    }

    /*async onSolutionSelectChange(file_path:string){
        this.listePath.next(file_path);
        this.creneaux = await this.csvReader.getCsvContent(file_path);
        console.log(this.creneaux);
    }*/

   async getFileContent(file_path : string){
        return await this.csvReader.getCsvContent(file_path);
    }

}

export class Creneau{
    public contrat: string;
    public agent: string;
    public postes: string[]
    constructor(contrat: string, agent: string, postes: string[]){
        this.contrat = contrat;
        this.agent = agent;
        this.postes = postes;
    }
}