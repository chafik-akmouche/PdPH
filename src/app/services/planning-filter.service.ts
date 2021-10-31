export class PlanningFilterService{

    nombreSemaine : number = 1;

    onSelectNombreSemaineChange(nombre : number){
        this.nombreSemaine = nombre;
    }

}