import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpService } from 'src/app/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaneService {

  // Atributos
  private domain = "http://localhost:3000"
  private planesUrl = '/api/planes';  // URL to web api
  private planeUrl = '/api/plane';  // URL to web api


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
  getPlanes():Observable<any>{
    return this.httpService.getList(`${this.domain}${this.planesUrl}`)
  }

  newPlane(plane:any):Observable<any>{
    return this.httpService.newItem(`${this.domain}${this.planeUrl}`, plane,this.createHeader())
  }

  updatePlane(plane:any,id:string):Observable<any>{
    return this.httpService.updateItem(`${this.domain}${this.planeUrl}`, plane,id,this.createHeader())
  }

  deletePlane (id: string): Observable<any> {
    return this.httpService.deleteItem(`${this.domain}${this.planeUrl}`, id)
  }

  getPlane(id:string):Observable<any>{
    return this.httpService.getItem(`${this.domain}${this.planeUrl}`,id);
  }
}