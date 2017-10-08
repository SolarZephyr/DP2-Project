import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { CRUDService } from './common/services/crudservice';
import { Employee } from './common/typings/typings.d';

import {LoginService} from './common/services/loginservice';
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
  constructor(private element: ElementRef,  private sv: CRUDService, public loginService: LoginService){
    this.loggedIn = false;
  }
  ngAfterViewInit() {
    componentHandler.upgradeAllRegistered();
  }


  logIn() {
    
    this.sv.getEmployeeByID(this.loggedId).subscribe(data => {
      this.loginService.user = data;
      },
      err => {
          console.log('we got an error:', err);
          
      }, () =>{
        if(this.loginService.user != null){
          this.loginService.loggedIn = true;
        }
      });
  }
  logOut(){
      this.loginService.loggedIn = false;
      this.loginService.user = null;
  }
  
  
  getTheData(id: string){
    alert(id);
  }
}
