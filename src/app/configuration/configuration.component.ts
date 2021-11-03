import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent {

  file : string;

  constructor() {
    this.file = "";
  }

  checkFile(file : string) {
    return (file.endsWith(".txt"));
  }


  lancerSolveur(form: NgForm) {
    console.log(this.checkFile(form.value["inputFile"]));
    // appeler le back
  }

}
