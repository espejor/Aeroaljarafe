import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomCalendarComponent } from "./customCalendar.component";
import { CustomCalendarService } from "./customCalendar.service";
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';

@NgModule({
  declarations: [CustomCalendarComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [CustomCalendarService],
  exports: [CustomCalendarComponent]
})
export class CustomCalendarModule {}
