import { Component } from '@angular/core';
import { Employee } from '../common/typings/typings.d';
import { CRUDService } from '../common/services/crudservice';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Observable} from 'rxjs/Observable';
declare var componentHandler: any;
import 'rxjs/Rx';

@Component({
  selector: 'employee-form',
  templateUrl: './employee-form.component.html',
  providers:[CRUDService]
})

export class EmployeeForm {
  title = 'employee form';
  
  editMode: Boolean = false;
  sub: any;
  id: number = null;

  currentEmployee: Employee;
  newEmployee: Employee = {};

  constructor(private route: ActivatedRoute, private sv: CRUDService) {
   
  }
  public MDLtxtFieldsCheckDirty(){
    var nodeList = document.querySelectorAll('.mdl-textfield'); //for all
    Array.prototype.forEach.call(nodeList, function (elem) {
        if(elem.MaterialTextfield != null)
            elem.MaterialTextfield.checkDirty();   
    });
}
  Clear() {
    this.newEmployee = {};
    this.currentEmployee = {};
    (<HTMLInputElement>document.getElementById("EmployeeFirstName")).value = null;
    (<HTMLInputElement>document.getElementById("EmployeeLastName")).value = null;

  }

  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['ID']; // (+) converts string 'id' to a number    
    });

    if(!isNaN(this.id))
      this.editMode = true;

    this.currentEmployee = {};
    if(this.editMode){
      this.LoadEmployeeData();

    }

  }


  LoadEmployeeData(){
    this.sv.getEmployeeByID(this.id).subscribe(data => {
      this.currentEmployee = data;
      },
      err => {
          console.log('we got an error:', err);
          
      }, () =>{
        this.FillForm();
      });
  }

  FillForm(){
    (<HTMLInputElement>document.getElementById("EmployeeFirstName")).value = this.currentEmployee.FirstName;
    (<HTMLInputElement>document.getElementById("EmployeeLastName")).value = this.currentEmployee.LastName;

  }
  ngAfterViewInit() {
    componentHandler.upgradeAllRegistered();
  }

  ngAfterContentChecked(){
    this.MDLtxtFieldsCheckDirty();
  }
  
  SaveEmployee(){
    this.generateEmployeeFromForm();
    if(this.editMode){ 
      this.sv.putEmployee(this.id.toString(), this.newEmployee).subscribe(
        () => {},
      err => {console.log("failure")}, //if error
      () => {console.log("success")});  //if success 
      
    }
    else{
       this.sv.postEmployee(this.newEmployee).subscribe(data => {
        
        },
        err => {
            console.log('we got an error:', err);
            
        }, () =>{
          alert("POST SUCCESS!");
        });
    }

  }


  generateEmployeeFromForm(){ 
    if(this.editMode)
        this.newEmployee.ID = this.id;

    this.newEmployee.FirstName = (<HTMLInputElement>document.getElementById("EmployeeFirstName")).value;
    this.newEmployee.LastName = ((<HTMLInputElement>document.getElementById("EmployeeLastName")).value);
    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
