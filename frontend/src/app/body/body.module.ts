import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { UserModule } from '../user/user.module';
import { BrandModule } from './brand/brand.module';
import { MainComponent } from './main/main.component'
import { ModelModule } from './model/model.module';
import { PlaneModule } from './plane/plane.module';
import { AvailabilityModule } from './availability/availability.module';
import { StatusModule } from './status/status.module';
import { ImgcropperModule } from './imgcropper/imgcropper.module';
import { FlightModule } from './flight/flight.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { CalendarioModule } from './calendario/calendario.module';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    UserModule,
    BrandModule,
    ModelModule,
    PlaneModule,
    AvailabilityModule,
    StatusModule,
    ImgcropperModule,
    FlightModule,
    SchedulerModule,
    CalendarioModule
  ],
  exports:[
    ImgcropperModule,
    SchedulerModule,
    CalendarioModule
  ]
})
export class BodyModule { }
