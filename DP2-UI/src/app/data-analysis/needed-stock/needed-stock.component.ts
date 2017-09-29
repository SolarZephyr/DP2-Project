import { Component } from '@angular/core';
import { Product } from '../../common/typings/typings.d';

@Component({
  selector: 'needed-stock',
  templateUrl: './needed-stock.component.html'
})

export class NeededStock {
  title = 'Needed Stock';
  neededstock : Product[];
}
