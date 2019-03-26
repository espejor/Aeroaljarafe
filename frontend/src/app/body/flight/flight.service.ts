import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpService } from 'src/app/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  // Atributos
  private domain = "http://localhost:3000"
  private flightsUrl = '/api/flights';  // URL to web api
  private flightUrl = '/api/flight';  // URL to web api


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
  getFlights():Observable<any>{
    return this.httpService.getList(`${this.domain}${this.flightsUrl}`)
  }

  newFlight(flight:any):Observable<any>{
    return this.httpService.newItem(`${this.domain}${this.flightUrl}`, flight,this.createHeader())
  }

  updateFlight(flight:any,id:string):Observable<any>{
    return this.httpService.updateItem(`${this.domain}${this.flightUrl}`, flight,id,this.createHeader())
  }

  deleteFlight (id: string): Observable<any> {
    return this.httpService.deleteItem(`${this.domain}${this.flightUrl}`, id)
  }

  getFlight(id:string):Observable<any>{
    return this.httpService.getItem(`${this.domain}${this.flightUrl}`,id);
  }
}
