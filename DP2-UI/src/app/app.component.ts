import { Component, AfterViewInit } from '@angular/core';
declare var componentHandler: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  constructor(){
  
  }
  ngAfterViewInit() {
        componentHandler.upgradeAllRegistered();
    }
      
  getTheData(id: string){
    alert(id);
  }
}
