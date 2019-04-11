import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FlightService } from "./flight.service";
import { ListflightsComponent } from "./listflights/listflights.component";
import { EditflightComponent } from "./editflight/editflight.component";
import { FlightRoutingModule } from "./flight-routing.module";
import { NewflightComponent } from "./newflight/newflight.component";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ConfirmationPopoverModule } from "angular-confirmation-popover";
import { from } from "rxjs";
import { ImgcropperModule } from '../imgcropper/imgcropper.module';
import { SchedulerModule } from '../scheduler/scheduler.module';
import { CalendarioModule } from '../calendario/calendario.module';


@NgModule({
  declarations: [
    ListflightsComponent,
    EditflightComponent,
    NewflightComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlightRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ConfirmationPopoverModule,
    ImgcropperModule,
    BrowserAnimationsModule,
    SchedulerModule,
    CalendarioModule
  
  ],
  providers: [FlightService],
  exports: []
})
export class FlightModule {}