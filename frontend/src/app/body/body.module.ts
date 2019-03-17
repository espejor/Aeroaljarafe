import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { UserModule } from '../user/user.module';
import { ErrorsComponent } from '../errors/errors.component';
import { BrandModule } from './brand/brand.module';
import { MainComponent } from './main/main.component'
import { ModelModule } from './model/model.module';
import { PlaneModule } from './plane/plane.module';
import { AvailabilityModule } from './availability/availability.module';
import { StatusModule } from './status/status.module';

@NgModule({
  declarations: [
    ErrorsComponent, 
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
    StatusModule
  ]
})
export class BodyModule { }
