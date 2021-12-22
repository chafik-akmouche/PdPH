import { keyframes } from "@angular/animations";
import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CsvReader } from "./csvReader.service";

@Injectable()

export class PlanningService{

    private nombreSemaineSelect : number = 1;
    private fichierSelect : string = '';
    private typeAffichageSelect : string = 'tout';
    private typeContratSelect : string = "tout";
    private agentSelect : string = "";
    private nw : number = 9; //nombre de semaine lu a partir des données de configuration
    public creneaux_Aff : EventEmitter<Creneau[]>;
    public listeNombreS : BehaviorSubject<number>;
    public listeSolution : BehaviorSubject<string>;
    public listeTypeAff : BehaviorSubject<string>;
    public listeTypeContrat : BehaviorSubject<string>;
    public listeAgent : BehaviorSubject<string>;
    public creneaux : Creneau[] = [];
    public creneaux_triee : Creneau[];

    constructor(private csvReader : CsvReader){
        this.creneaux_Aff = new EventEmitter();

        this.listeNombreS = new BehaviorSubject(this.nombreSemaineSelect);
        this.listeSolution = new BehaviorSubject(this.fichierSelect); 
        this.listeTypeAff = new BehaviorSubject(this.typeAffichageSelect);
        this.listeTypeContrat = new BehaviorSubject(this.typeContratSelect);
        this.listeAgent = new BehaviorSubject(this.agentSelect);
        this.creneaux_triee = this.creneaux;
    }
    
    setCreneauxAffichable(nombre : number, type_trie : string , creneaux : Creneau[]){
        let cpt = 7;
        let new_poste : string[] = [];
        let poste_f : string[] = [];
        let tab_creneau : Creneau[] = [];
        let cpt_max = nombre * cpt;
        let i = 0;
        let color : string = "";

        this.setCreneauxColor(this.generateColors());
        this.setTabCreneauByTypeAffichage(this.creneaux,type_trie);

        for(let creneaux_agent of creneaux){

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

           tab_creneau.push(new Creneau(creneaux_agent.contrat, creneaux_agent.agent,poste_f,creneaux_agent.color));
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


    /** fonction permettant de genéré la liste de couleur selon le différent type de poste
        retourne un tableau associative dont les indices sont les types contrats et les valeurs sont les couleurs
    **/

    public generateColors(){
        let contrats:string[] = [];
        let colorsCount : number;
        let listColors : string[] = [];
        var obj: MyType = {};

        for(let c of this.creneaux){ // recupération des différents type de couleur
            if(contrats.indexOf(c.contrat) == -1){
                contrats.push(c.contrat);
            }
        }

        colorsCount = contrats.length; // comptage du nombre de couleur

        for(let i = 0; i < colorsCount ; i++){ //generation du liste de couleur selon le nombre de contrat
            let color = this.getRandomColor();

            if(listColors.indexOf(color) == -1){
                listColors.push(color);
            }
        }

        for(let i = 0; i < colorsCount ; i++){ //generation du tableau associative a partir du liste de couleurs et contrats
                                               //calculés précedemment
            obj[contrats[i]] = listColors[i];
        }
        
        return obj;
    }

    public setCreneauxColor(tabCouleurContrat : MyType){
        let my_keys = Object.keys(tabCouleurContrat)

        for(let c of this.creneaux){
            for(let i = 0; i < my_keys.length; i++){
                if(my_keys[i] == c.contrat)
                    c.color = tabCouleurContrat[my_keys[i]];
            }
        }
    }



    public getRandomColor() : string {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    /*** Fonctions sur les évenements ***/

    onSelectNombreSemaineChange(nombre : number){
        this.nombreSemaineSelect = nombre;
        this.listeNombreS.next(this.nombreSemaineSelect);
        this.setCreneauxAffichable(this.nombreSemaineSelect,this.typeAffichageSelect,this.creneaux_triee);
    }

    onSolutionSelectChange(file_name:string){
        this.fichierSelect = file_name;
        this.creneaux_triee = this.creneaux;
        this.listeSolution.next(this.fichierSelect);
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
    public color: string;
    
    constructor(contrat: string, agent: string, postes: string[],color:string){
        this.contrat = contrat;
        this.agent = agent;
        this.postes = postes;
        this.color = color;
    }
}

/* 
    interface représentant le type de mon tableau associative retourner par
    la fonction generateColors
*/
interface MyType {
    [key: string]: string;
}