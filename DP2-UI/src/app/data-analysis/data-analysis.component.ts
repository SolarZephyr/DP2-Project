import { Component } from '@angular/core';
import { PredictedSales } from '../common/typings/typings.d';
import { CRUDService } from '../common/services/crudservice';
@Component({
  selector: 'data-analysis',
  templateUrl: './data-analysis.component.html',
  providers:[CRUDService]
})

export class DataAnalysis {
  title = 'Data Analysis';
  sort : string = "id";
  state = {"skip":0, "take":10};
  predictions : Array<any>

  constructor (private sv: CRUDService) {

  }
 
  debug(){
    console.log(JSON.stringify(this.predictions));
  }

  ngOnInit(){
    this.LoadAllSales();
  }

  LoadAllSales(){
    this.sv.getPredictions().subscribe(data => {
            console.log(data);
            
            },
            err => {
                console.log('we got an error:', err);
                
     });
  }
  
}