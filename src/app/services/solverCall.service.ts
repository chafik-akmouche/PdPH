import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Creneau } from "./planning.service";

@Injectable()
export class CallSolver{
    solutions_list :  BehaviorSubject<string>;
    creneaux_list : BehaviorSubject<Creneau[]>;
    filterParms : BehaviorSubject<FilterParams>;
    solveurParams : BehaviorSubject<SolveurParam>;

    constructor(private httpClient : HttpClient){
        let creneau : any[] = [];
        let filterParams : any;
        let solveurParams: any;
        this.solutions_list = new BehaviorSubject("");
        this.creneaux_list = new BehaviorSubject(creneau);
        this.filterParms = new BehaviorSubject(filterParams);
        this.solveurParams = new BehaviorSubject(solveurParams);
    }

    public sendDataToSolver(nb_semaine:number,input_file:string,data_input : string,contrainte11 : boolean,contrainte12 : boolean,
                            contrainte13 : boolean, contrainte14 : boolean, contrainte15 : boolean){

        const object_solver = {
            "nb_semaine" : nb_semaine,
            "input_file" : input_file,
            "input_data" : data_input,
            
        };


        this.httpClient.post("http://localhost:8080/callsolveur", object_solver)    
            .subscribe(
                (res) => {
                    if(res){
                        //console.log(res.toString());
                        this.solutions_list.next(res.toString());
                    }

                },
                (error) => {
                    console.log("Erreur retourner par le back " + error);
                }
        );
    }

    public getSolutionContent(name : string){
        let creneaux : any = [];
        this.httpClient.get("http://localhost:8080/solution?name=" + name).subscribe(
            (res) => {
                if(res){
                  creneaux = res;
                  this.creneaux_list.next(creneaux);
                }
            },
            (error) => {
                console.log("Erreur retourner par le back " + error);
            }
        );
    }

    public getDefaultSolutionsName(){
        let filterParams : any;
        this.httpClient.get("http://localhost:8080/").subscribe(
            (res) => {
                if(res){
                    filterParams = res;
                    this.filterParms.next(filterParams);
                    this.solutions_list.next(filterParams.solutions.toString());
                    this.getSolutionsParams();
                }
            }
        )
    }

    public getSolutionsParams(){
        let solveurParam : any;

        //recupération des paramètres du dernier solution
        this.httpClient.get("http://localhost:8080/parameters").subscribe(
            (res) => {
                solveurParam = res;
                this.solveurParams.next(solveurParam);
            },
            (error) => {

            }
        )
    }
}


export class FilterParams{
    public nombreSemaine : number;
	public solutions : string[];

    constructor(nombreSemaine : number, solutions: string[]){
        this.nombreSemaine = nombreSemaine;
        this.solutions = solutions;
    }

    public getNombreSemaine(){
        return this.nombreSemaine;
    }

    public setNombreSemaine(nb_semaine : number){
        this.nombreSemaine = nb_semaine;
    }

    public getSolutions(){
        return this.solutions;
    }
}

export class SolveurParam{
    public nb_semaine : number;
    public input_file: string;
    public input_data : string;
    public contrainte11 : boolean;
    public contrainte12 : boolean;
    public contrainte13 : boolean;
    public contrainte14 : boolean;
    public contrainte15 : boolean;

    public constructor(nb : number, input : string, input_data : string, c11:boolean, c12:boolean, c13:boolean, c14:boolean, c15:boolean){
        this.nb_semaine = nb;
        this.input_file = input;
        this.input_data = input_data;
        this.contrainte11 = c11;
        this.contrainte12 = c12;
        this.contrainte13 = c13;
        this.contrainte14 = c14;
        this.contrainte15 = c15;
    }
}


