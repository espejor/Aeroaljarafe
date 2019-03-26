import { Injectable,ErrorHandler } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // Atributos
  private domain = "http://localhost:3000"
  private usersUrl = '/api/users';  // URL to web api
  private userUrl = '/api/user';  // URL to web api
  private signUpUrl = '/api/signup';  // URL to web api
  private signInUrl = '/api/signin';  // URL to web api

  private httpOptions = {
    headers: this.createHeader()
  };
  //private users:User[];
  // Constructor
  constructor(
    private http: HttpClient
    ) {
      this.httpOptions = {
        headers: this.createHeader()
    }; 
  }


  // Privates Methods 

  private createHeader():HttpHeaders{
    return  new HttpHeaders({ 
  //    'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  }


  // Publics Methods
  getList(url:string):Observable<any>{
    return this.http.get<any[]>(url, this.httpOptions)
    // .pipe(
    //   map(res => res),
    //   tap(_ => console.log('fetched values')),
    //   catchError(this.errorsService.handleError('list Error', []))
    // );
  }
  

  newItem(url:string,item:any,options?:HttpHeaders):Observable<any>{
    // var contentype: string =  options.get("Content-Type")
    // var oldContentType = this.httpOptions.headers.get("Content-Type")

    // if (options){
    //   this.httpOptions.headers.set
    // }


    //var newContentType = this.httpOptions.headers.get("content-type")
    return this.http.post(url, item, this.httpOptions)
    // .pipe(
    //   map(res => res),
    //   tap((newItem) => console.log(`added item ${newItem}`)),
    //   catchError(this.errorsService.handleError<any>('newItem'))
    // );
  }


  updateItem(url:string,item:any,id:string,options?:HttpHeaders):Observable<any>{
    //const id = item._id;
    return this.http.put(`${url}/${id}`, item, this.httpOptions)
    // .pipe(
    //   tap(_ => console.log(`updated item id=${item._id}`)),
    //   catchError(this.errorsService.handleError<any>('updateItem'))
    // );
  }

  deleteItem (url:string, id: string ): Observable<any> {
    //const id = item instanceof String ? item : item._id;

    return this.http.delete(`${url}/${id}`, this.httpOptions)
    // .pipe(
    //   map(res => res),
    //   tap(),
    //   catchError(this.errorsService.handleError<any>('deleteItem'))
    // );
  }

  getItem(url:string, id:string):Observable<any>{
    return this.http.get<any>(`${url}/${id}`,this.httpOptions)    
    // .pipe(
    //   map(res => res),
    //   tap(_ => console.log('fetched item')),
    //   catchError(this.errorsService.handleError('getItem', []))
    // );
  }

}
