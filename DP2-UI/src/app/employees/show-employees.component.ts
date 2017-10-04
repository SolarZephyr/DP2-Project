import { Component, OnInit } from '@angular/core';
import { Employee } from '../common/typings/typings.d';
import { CRUDService } from '../common/services/crudservice';


@Component({
  selector: 'show-employees',
  templateUrl: './show-employees.component.html',
  providers:[CRUDService]
})

export class ShowEmployeesComponent implements OnInit{
  employees: Array<Employee>;

  constructor(private sv: CRUDService){
    this.employees = [];
  }

  ngOnInit(){
    this.LoadAllEmployees();
  }

  LoadAllEmployees(){
    this.sv.getEmployees().subscribe(data => {
            this.employees = data;
            },
            err => {
                console.log('we got an error:', err);
                
            });
  }


}
