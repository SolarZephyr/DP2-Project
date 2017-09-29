import { Component } from '@angular/core';
import { Transaction } from '../../common/typings/typings.d'

@Component({
  selector: 'monthly-sales',
  templateUrl: './monthly-sales.component.html'
})

export class MonthlySales {
  title = 'Monthly Sales';
  transactions : Transaction[];
}
