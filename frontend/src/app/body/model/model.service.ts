import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpService } from 'src/app/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  // Atributos
  private domain = "http://localhost:3000"
  private modelsUrl = '/api/models';  // URL to web api
  private modelUrl = '/api/model';  // URL to web api


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
  getModels():Observable<any>{
    return this.httpService.getList(`${this.domain}${this.modelsUrl}`)
  }

  newModel(model:any):Observable<any>{
    return this.httpService.newItem(`${this.domain}${this.modelUrl}`, model,this.createHeader())
  }

  updateModel(model:any,id:string):Observable<any>{
    return this.httpService.updateItem(`${this.domain}${this.modelUrl}`, model,id,this.createHeader())
  }

  deleteModel (id: string): Observable<any> {
    return this.httpService.deleteItem(`${this.domain}${this.modelUrl}`, id)
  }

  getModel(id:string):Observable<any>{
    return this.httpService.getItem(`${this.domain}${this.modelUrl}`,id);
  }
}