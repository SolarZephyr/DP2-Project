import { Component } from '@angular/core';
import { Employee, Position } from '../common/typings/typings.d';
import { CRUDService } from '../common/services/crudservice';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {Observable} from 'rxjs/Observable';
declare var componentHandler: any;
import 'rxjs/Rx';

let api = new CRUDService(this);


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

  positions: Position[];
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
    /*(<HTMLInputElement>document.getElementById("EmployeeFirstName")). = null;
    (<HTMLInputElement>document.getElementById("EmployeeLastName")).value = "";
    (<HTMLInputElement>document.getElementById("EmployeeSalary")).value = "00000.00";
    (<HTMLInputElement>document.getElementById("EmployeePosition")).value = "Pharmacist";
    (<HTMLInputElement>document.getElementById("EmployeeHomeBSB")).value = this.currentEmployee.BSB;
    (<HTMLInputElement>document.getElementById("EmployeeAccount")).value = this.currentEmployee.AccountNo;
    (<HTMLInputElement>document.getElementById("EmployeeAddress")).value = this.currentEmployee.Address;
    (<HTMLInputElement>document.getElementById("EmployeeCity")).value = this.currentEmployee.City;
    (<HTMLInputElement>document.getElementById("EmployeePostcode")).valueAsNumber = 0;
    (<HTMLInputElement>document.getElementById("EmployeeHomePhone")).value = this.currentEmployee.HomePhone;
    (<HTMLInputElement>document.getElementById("EmployeeMobile")).value = this.currentEmployee.Mobile;*/
  }

  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['ID']; // (+) converts string 'id' to a number    
    });

    //this.LoadPositionData();

    if(!isNaN(this.id))
      this.editMode = true;

    this.currentEmployee = {};
    if(this.editMode){
      this.LoadEmployeeData();

    }

  }

  LoadTypeData(){
    /*this.sv.getAllPositions().subscribe(data => {
      this.positions = data;
      },
      err => {
          console.log('we got an error:', err);
          
      });*/
  }

  LoadEmployeeData(){
    /*this.sv.getEmployeeByID(this.id).subscribe(data => {
      this.currentEmployee = data;
      },
      err => {
          console.log('we got an error:', err);
          
      }, () =>{
        this.FillForm();
      });*/
  }

  FillForm(){
    (<HTMLInputElement>document.getElementById("EmployeeFirstName")).value = this.currentEmployee.FirstName;
    (<HTMLInputElement>document.getElementById("EmployeeLastName")).value = this.currentEmployee.LastName;
    (<HTMLInputElement>document.getElementById("EmployeeSalary")).value = this.currentEmployee.Salary.toString();
    (<HTMLInputElement>document.getElementById("EmployeePosition")).value = this.currentEmployee.Position;
    (<HTMLInputElement>document.getElementById("EmployeeHomeBSB")).value = this.currentEmployee.BSB;
    (<HTMLInputElement>document.getElementById("EmployeeAccount")).value = this.currentEmployee.AccountNo;
    (<HTMLInputElement>document.getElementById("EmployeeAddress")).value = this.currentEmployee.Address;
    (<HTMLInputElement>document.getElementById("EmployeeCity")).value = this.currentEmployee.City;
    (<HTMLInputElement>document.getElementById("EmployeePostcode")).value = this.currentEmployee.Postcode.toString();
    (<HTMLInputElement>document.getElementById("EmployeeHomePhone")).value = this.currentEmployee.HomePhone;
    (<HTMLInputElement>document.getElementById("EmployeeMobile")).value = this.currentEmployee.Mobile;
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
      /* this.sv.putEmployee(this.id.toString(), this.newEmployee).subscribe(
        () => {},
      err => {console.log("failure")}, //if error
      () => {console.log("success")}); */ //if success 
      
    }
    else{
      /* this.sv.postEmployee(this.newEmployee).subscribe(data => {
        
        },
        err => {
            console.log('we got an error:', err);
            
        }, () =>{
          alert("POST SUCCESS!");
        }); */
    }

  }


  generateEmployeeFromForm(){ 
    if(this.editMode)
        this.newEmployee.ID = this.id;
    this.newEmployee.FirstName = (<HTMLInputElement>document.getElementById("EmployeeFirstName")).value;
    this.newEmployee.LastName = ((<HTMLInputElement>document.getElementById("EmployeeLastName")).value);
    this.newEmployee.Salary =  Number((<HTMLInputElement>document.getElementById("EmployeeSalary")).value);
    this.newEmployee.Position =  ((<HTMLInputElement>document.getElementById("EmployeePosition")).value);
    this.newEmployee.BSB =  ((<HTMLInputElement>document.getElementById("EmployeeBSB")).value);
    this.newEmployee.AccountNo =  ((<HTMLInputElement>document.getElementById("EmployeeAccountNo")).value);
    this.newEmployee.Address =  ((<HTMLInputElement>document.getElementById("EmployeeAddress")).value);
    this.newEmployee.City =  ((<HTMLInputElement>document.getElementById("EmployeeCity")).value);
    this.newEmployee.Postcode =  Number((<HTMLInputElement>document.getElementById("EmployeePostcode")).value);
    this.newEmployee.HomePhone =  ((<HTMLInputElement>document.getElementById("EmployeeHomePhone")).value);
    this.newEmployee.Mobile =  ((<HTMLInputElement>document.getElementById("EmployeeMobile")).value);
    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
