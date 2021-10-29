import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Creneau } from "./creneauxAgent.service";

@Injectable()
export class CsvReader {
  public creneauArray: Creneau[] = [];
  constructor(private http: HttpClient) {}

  getCsvContent () {
    this.http.get('assets/mon_fichier.csv', {responseType: 'text'})
    .subscribe(
      data => {
        let csvToRowArray = data.split("\n");
        for (let i=0; i<csvToRowArray.length-1; i++) {
          let row = csvToRowArray[i].split(";");
          let m_postes: String[] = [];
          for (let j=0; j<row.length-2; j++) {
            m_postes[j] = row[j+2];
          }
          this.creneauArray.push(new Creneau(row[0], row[1], m_postes));
        }
      }
    );
    return this.creneauArray;
  }
}
