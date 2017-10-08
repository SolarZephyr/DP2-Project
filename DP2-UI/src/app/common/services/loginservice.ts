import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Employee } from '../typings/typings.d';

@Injectable()
export class LoginService {
  public user: Employee = {};
  public loggedIn: boolean = false;

}
