import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Creneau } from "./planning.service";

@Injectable()
export class CallSolver{
    solutions_list :  BehaviorSubject<string>;
    creneaux_list : BehaviorSubject<Creneau[]>;

    constructor(private httpClient : HttpClient){
        let creneau : any[] = [];
        this.solutions_list = new BehaviorSubject("");
        this.creneaux_list = new BehaviorSubject(creneau);
    }

    public sendDataToSolver(nb_semaine:number,data_input : string,hmax:number,hg_max:number,
                            OffD:number,Reph:number,contrainte1 : boolean,contrainte2:boolean){

        const object_solver = {
            "nb_semaine" : nb_semaine,
            "input_file" : data_input,
            "hmax": hmax,
            "hg_max":hg_max,
            "offd":OffD,
            "reph":Reph,
            "contrainte1":contrainte1,
            "contrainte2":contrainte2
        };



        this.httpClient.post("http://localhost:8080/callsolveur", object_solver)    
            .subscribe(
                (res) => {
                    if(res){
                        console.log(res.toString());
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
        this.httpClient.get("http://localhost:8080/").subscribe(
            (res) => {
                if(res){
                    this.solutions_list.next(res.toString());
                }
            }
        )
    }
}
