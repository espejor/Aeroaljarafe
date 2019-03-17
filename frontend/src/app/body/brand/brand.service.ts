import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpService } from 'src/app/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  // Atributos
  private domain = "http://localhost:3000"
  private brandsUrl = '/api/brands';  // URL to web api
  private brandUrl = '/api/brand';  // URL to web api


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
  getBrands():Observable<any>{
    return this.httpService.getList(`${this.domain}${this.brandsUrl}`)
  }

  newBrand(brand:any):Observable<any>{
    return this.httpService.newItem(`${this.domain}${this.brandUrl}`, brand,this.createHeader())
  }

  updateBrand(brand:any,id:string):Observable<any>{
    return this.httpService.updateItem(`${this.domain}${this.brandUrl}`, brand,id,this.createHeader())
  }

  deleteBrand (id: string): Observable<any> {
    return this.httpService.deleteItem(`${this.domain}${this.brandUrl}`, id)
  }

  getBrand(id:string):Observable<any>{
    return this.httpService.getItem(`${this.domain}${this.brandUrl}`,id);
  }
}
