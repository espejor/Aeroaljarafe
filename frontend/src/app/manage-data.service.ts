import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManageDataService {

  constructor() { }

  setUpDateTypeForInputControl(date:any):Date{
    return date.split('T')[0]
  }

}
