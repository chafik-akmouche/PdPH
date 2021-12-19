import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class CallSolver{
    constructor(private httpClient : HttpClient){}

    public sendDataToSolver(nb_semaine:number,tab_data_input : string[],output_directory:string,hmax:number,hg_max:number,
                            OffD:number,Reph:number,contrainte1 : boolean,contrainte2:boolean){
        
        const object_solver = {
            "nb_semaine" : nb_semaine,
            "input_file" : tab_data_input,
            "output_directory": output_directory,
            "hmax": hmax,
            "hg_max":hg_max,
            "offd":OffD,
            "reph":Reph,
            "contrainte1":contrainte1,
            "contrainte2":contrainte2
        };

        console.log(tab_data_input);

        /*this.httpClient.post("http://localhost:8080/callsolveur", object_solver)
            .subscribe(
                (res) => {
                    if(res){
                        //envoie des solutions dans le répertoire cible 
                    }
                },
                (error) => {
                    console.log("Erreur retourner par le back " + error);
                }
            );*/
    }
}