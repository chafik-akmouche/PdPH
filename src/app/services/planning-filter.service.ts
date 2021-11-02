export class PlanningFilterService{

    static nombreSemaine : number = 1;

    onSelectNombreSemaineChange(nombre : number){
        PlanningFilterService.nombreSemaine = nombre;
    }

}