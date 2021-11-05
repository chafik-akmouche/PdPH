import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CsvReader } from "./csvReader.service";

@Injectable()

export class PlanningService{

    private nombreSemaineSelect : number = 1;
    private fichierSelect : string = 'assets/solutions/fichier-1.csv';
    private typeAffichageSelect : string = 'tout';
    private typeContratSelect : string = "tout";
    private agentSelect : string = "";
    private nw : number = 9; //nombre de semaine lu a partir des données de configuration
    public creneaux_Aff : EventEmitter<Creneau[]>;
    public listeNombreS : BehaviorSubject<number>;
    public listePath : BehaviorSubject<string>;
    public listeTypeAff : BehaviorSubject<string>;
    public listeTypeContrat : BehaviorSubject<string>;
    public listeAgent : BehaviorSubject<string>;
    public creneaux : Creneau[] = [];
    public creneaux_triee : Creneau[];

    constructor(private csvReader : CsvReader){
        this.creneaux_Aff = new EventEmitter();

        this.listeNombreS = new BehaviorSubject(this.nombreSemaineSelect);
        this.listePath = new BehaviorSubject(this.fichierSelect); 
        this.listeTypeAff = new BehaviorSubject(this.typeAffichageSelect);
        this.listeTypeContrat = new BehaviorSubject(this.typeContratSelect);
        this.listeAgent = new BehaviorSubject(this.agentSelect);
        this.creneaux = this.csvReader.getCsvContent(this.fichierSelect);
        this.creneaux_triee = this.creneaux;
        setTimeout(() => {
            this.setCreneauxAffichable(this.nombreSemaineSelect,this.typeAffichageSelect,this.creneaux);
        }, 500);
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

    
    setCreneauxAffichable(nombre : number, type_trie : string , creneaux : Creneau[]){
        let cpt = 7;
        let new_poste : string[] = [];
        let poste_f : string[] = [];
        let tab_creneau : Creneau[] = [];
        let cpt_max = nombre * cpt;
        let i = 0;

        this.setTabCreneauByTypeAffichage(this.creneaux,type_trie);

        for(let creneaux_agent of  creneaux){

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
        this.creneaux_Aff.emit(tab_creneau);
    }

    getListeSemaine(){
        let liste = [];

        for (let i = 1; i <= this.nw; i++) {
            liste.push(i);
        }

        return liste;
    }

    getFileContent(file_path : string){    
        return this.csvReader.getCsvContent(file_path);
    }

    setTabCreneauByTypeAffichage(tab_creneau : Creneau[], type_affichage : string){
     
        switch(type_affichage){
            case "tout" :
                break;
            case "typeC" :
                tab_creneau.sort( 
                    (c1 , c2) => {
                        return (c1.contrat > c2.contrat) ? 1 : ((c2.contrat > c1.contrat) ? -1 : 0);
                    })
            break;
            case "agent" :
                tab_creneau.sort(
                    (c1 , c2) => {
                        return (c1.agent > c2.agent) ? 1 : ((c2.agent > c1.agent) ? -1 : 0);
                    }
                )
            break;
        }
             
    }

    public selectListeContrat(){
        let contrats : string[] = [];
       
        for(let c of this.creneaux){
            contrats.push(c.contrat);
        }

        contrats = contrats.filter(function(item, pos) {
            return contrats.indexOf(item) == pos;
        })

        return contrats;
    }

    public selectCreneauxByContrat(type_c : string){
        let t_creneau : Creneau[] = [];
        
        for(let c of this.creneaux){
            if(c.contrat == type_c)
                t_creneau.push(c)
        }

        this.creneaux = t_creneau;
    }

    /*** Fonctions sur les évenements ***/

    onSelectNombreSemaineChange(nombre : number){
        this.nombreSemaineSelect = nombre;
        this.listeNombreS.next(this.nombreSemaineSelect);
        this.setCreneauxAffichable(this.nombreSemaineSelect,this.typeAffichageSelect,this.creneaux_triee);
    }

    onSolutionSelectChange(file_path:string){
        this.fichierSelect = file_path;
        this.creneaux_triee = this.creneaux;
        this.listePath.next(this.fichierSelect);
    }

    onSelectAfficherParChange(type : string){
        this.typeAffichageSelect = type;
        this.listeTypeAff.next(this.typeAffichageSelect);
    }

    onTypeContratChange(type_contrat : string){
        this.typeContratSelect = type_contrat;
        this.listeTypeContrat.next(this.typeContratSelect);
    }

    onSelectAgentChange(nom_agent : string){
        this.agentSelect = nom_agent;
        this.listeAgent.next(this.agentSelect);
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