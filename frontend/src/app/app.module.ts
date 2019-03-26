import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { BodyComponent } from "./body/body.component";
import { FooterComponent } from "./footer/footer.component";
import { BodyModule } from "./body/body.module";
import * as $ from "jquery";
import { ToastrModule } from "ngx-toastr";
import { HttpErrorInterceptor } from "./http-error/http-error.interceptor";
import { ConfirmationPopoverModule } from "angular-confirmation-popover";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { CalendarModule, DateAdapter } from "angular-calendar";
// import { adapterFactory } from "angular-calendar/date-adapters/date-fns";

@NgModule({
  declarations: [AppComponent, HeaderComponent, BodyComponent, FooterComponent],
  imports: [
    BrowserModule,
    BodyModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: "toast-top-center",
      preventDuplicates: true
    }),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: "danger", // set defaults here
      cancelButtonType: "default",
      confirmText: "Borrar",
      cancelText: "Cancelar"
    }),
    BrowserAnimationsModule,
    // CalendarModule.forRoot({
    //   provide: DateAdapter,
    //   useFactory: adapterFactory
    // })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
