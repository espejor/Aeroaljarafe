import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { Optional } from "@angular/core";

export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(@Optional() private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "";
        let errorTitle = "";
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorTitle = `Código de error: ${error.status}\n ${this.decodeStatus(error.status) || error.message}`;
          errorMessage =  `${error.error.message} `;          
        }
        this.toastr.error(errorMessage, errorTitle);
        return throwError(error);
      })
    );
  }

  decodeStatus(status: number): string {
    switch (status) {
      case 401:
        return "No está autorizado";
      case 403:
        return "Acceso prohibido";
      case 404:
        return "Dato no encontrado";
      case 500:
        return "Error interno del Servidor";

      default:
        null;
        break;
    }
  }
}
