import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Login } from './common/typings/typings.d';
declare var componentHandler: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  login: Login = {};
  loggedIn : boolean;
  constructor(private element: ElementRef){
    this.loggedIn = false;
  }
  ngAfterViewInit() {
    componentHandler.upgradeAllRegistered();
  }

  
  
  getTheData(id: string){
    alert(id);
  }
}
