import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Creneau } from "./planning.service";

@Injectable()

export class CsvReader {

  constructor(private http: HttpClient) {
  }
  
  getCsvContent (file_path : string) {
    let creneauArray: Creneau[] = new Array();

    this.http.get(file_path, {responseType: 'text'})
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          for (let i=0; i<csvToRowArray.length-1; i++) {
            let row = csvToRowArray[i].split(";");
            let m_postes: string[] = [];
            for (let j=0; j<row.length-2; j++) {
              m_postes[j] = row[j+2];
            }
            creneauArray[i] = new Creneau(row[0], row[1], m_postes);
          }
        }
      );
    return creneauArray;
  }


}
