import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { CRUDService } from './common/services/crudservice';
import { Employee } from './common/typings/typings.d';
import { Globals } from './common/globals/globals';

declare var componentHandler: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[CRUDService]
})

export class AppComponent {
  title = 'app';
  loggedId: number = 0;
  loggedIn : boolean;
  result: Employee = null;
  sub: any;
  constructor(private element: ElementRef,  private sv: CRUDService, private globals: Globals){
    this.loggedIn = false;
  }
  ngAfterViewInit() {
    componentHandler.upgradeAllRegistered();
  }

  logIn() {
    let result: Employee; 
    this.sv.getEmployeeByID(this.globals.employeeID).subscribe(data => {
      result = data;
      },
      err => {
          console.log('we got an error:', err);
          
      }, () =>{
        if (result != null)
          {
            this.loggedIn = true;
          }
      });
  }

  logOut() {
    this.globals.employeeID = null;
    this.loggedIn = false;
  }
  
  
  getTheData(id: string){
    alert(id);
  }
}
