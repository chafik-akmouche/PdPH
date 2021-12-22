import { Injectable } from "@angular/core";

@Injectable()
export class SelectSolution{

    solutions : string[] = [];

    getSolutions(){ //faira appel au back avec une requete get
        return this.solutions;
    }

    setSolution(solutions : string[]){
        this.solutions = solutions;
    }

}
