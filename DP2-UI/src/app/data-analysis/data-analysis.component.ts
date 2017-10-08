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
  
  ngOnInit(){
    this.LoadAllSales();
  }

  LoadAllSales(){
    this.sv.getPredictions().subscribe(data => {
            this.predictions = data;
            
            },
            err => {
                console.log('we got an error:', err);
                
     });
  }
  
}