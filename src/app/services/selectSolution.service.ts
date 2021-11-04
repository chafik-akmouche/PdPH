import { Injectable } from "@angular/core";

@Injectable()
export class SelectSolution{

    solutions = [
        {
            "nom" : "fichier-1",
            "path" : "assets/solutions/fichier-1.csv"
        },
        {
            "nom" : "fichier-2",
            "path" : "assets/solutions/fichier-2.csv"
        },
        {
            "nom" : "fichier-3",
            "path" : "assets/solutions/fichier-3.csv"
        }
    ]

    getSolutions(){ //faira appel au back avec une requete get
        return this.solutions;
    }

}

export class Solution{
    public nom : string;
    public path : string;
    constructor(nom : string, path : string){
        this.nom = nom;
        this.path = path;
    }
}