export class Creneau {
  contrat!: String;
  agent!: String;
  postes : String [] = [];

  constructor(contrat:String, agent:String, postes:String[]=[]) {
    this.contrat = contrat;
    this.agent = agent;
    this.postes = postes;
  }
}
