import { Injectable, ErrorHandler } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./user.model";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { HttpService } from "../http.service";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class UserService {
  // Atributos
  private domain = "http://localhost:3000";
  private usersUrl = "/api/users"; // URL to web api
  private userUrl = "/api/user"; // URL to web api
  private signUpUrl = "/api/signup"; // URL to web api
  private signInUrl = "/api/signin"; // URL to web api

  //private users:User[];
  // Constructor
  constructor(
    private http: HttpClient,
    private httpService: HttpService
  ) {}
  // Methods
  getUsers(): Observable<any> {
    return this.httpService.getList(`${this.domain}${this.usersUrl}`);
  }

  newUser(user: User): Observable<any> {
    return this.httpService.newItem(`${this.domain}${this.signUpUrl}`, user);
  }

  login(user: User): Observable<any> {
    return this.http.post(this.domain + this.signInUrl, user, httpOptions)
    // .pipe(
    //   tap(res => console.log(`Recibido Token: ${res}`)),
    //   catchError(this.errorService.handleError<User>("login"))
    // );
  }

  logout() {
    localStorage.removeItem("token");
  }

  updateUser(user: User): Observable<any> {
    return this.httpService.updateItem(
      `${this.domain}${this.userUrl}`,
      user,
      user._id
    );
  }

  updateAvatar(user: User): Observable<any> {
    const id = user._id;
    return this.http
      .put(this.domain + this.userUrl + "/avatar", user, httpOptions)
      // .pipe(
      //   tap(_ => console.log(`updated item id=${id}`)),
      //   catchError(this.errorService.handleError<any>("updateAvatar"))
      // );
  }

  deleteUser(id: string): Observable<any> {
    return this.httpService.deleteItem(`${this.domain}${this.userUrl}`, id);
  }

  getUser(id: string): Observable<any> {
    return this.httpService.getItem(`${this.domain}${this.userUrl}`, id);
  }

  getNewUser(): User {
    let user = {
      _id: "",
      accessData: {
        email: "",
        signupDate: new Date(),
        lastLogin: new Date(),
        password: "",
        loginAttempts: 0,
        lockUntil: 0,
        role: ""
      },

      personalData: {
        displayName: "",
        avatar: "",
        address: ""
      },

      pilotData: {
        licence: "",
        aircraftsQualification: [],
        dataExpeditionLicence: new Date(),
        dataExpirationLicence: new Date(),
        dataExpirationMedicalExamination: new Date()
      }
    };
    return user;
  }
}
