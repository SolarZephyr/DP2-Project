import { Component } from '@angular/core';
import { Employee } from '../../common/typings/typings.d';

@Component({
  selector: 'employee-sales',
  templateUrl: './employee-sales.component.html'
})

export class EmployeeSales {
  title = 'Employee Sales';
  employees: Employee[];
}
