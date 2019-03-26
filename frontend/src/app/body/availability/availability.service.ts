import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpService } from 'src/app/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {

  // Atributos
  private domain = "http://localhost:3000"
  private availabilitiesUrl = '/api/availabilities';  // URL to web api
  private availabilityUrl = '/api/availability';  // URL to web api


  private createHeader():HttpHeaders{
    return  new HttpHeaders({ 
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  }

  //private users:User[];
  // Constructor
  constructor(
    private httpService: HttpService) { }
  // Methods
  getAvailabilities():Observable<any>{
    return this.httpService.getList(`${this.domain}${this.availabilitiesUrl}`)
  }

  newAvailability(availability:any):Observable<any>{
    return this.httpService.newItem(`${this.domain}${this.availabilityUrl}`, availability,this.createHeader())
  }

  updateAvailability(availability:any,id:string):Observable<any>{
    return this.httpService.updateItem(`${this.domain}${this.availabilityUrl}`, availability,id,this.createHeader())
  }

  deleteAvailability (id: string): Observable<any> {
    return this.httpService.deleteItem(`${this.domain}${this.availabilityUrl}`, id)
  }

  getAvailability(id:string):Observable<any>{
    return this.httpService.getItem(`${this.domain}${this.availabilityUrl}`,id);
  }
}
