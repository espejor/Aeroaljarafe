import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AvailabilityRoutingModule } from "./availability-routing.module";
import { ListavailabilitysComponent } from "./listavailabilitys/listavailabilitys.component";
import { EditavailabilityComponent } from "./editavailability/editavailability.component";
import { NewavailabilityComponent } from "./newavailability/newavailability.component";
import { AvailabilityService } from './availability.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListavailabilitysComponent,
    EditavailabilityComponent,
    NewavailabilityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AvailabilityRoutingModule
  ],
  providers: [
    AvailabilityService
  ],
  exports: [
  ]
})
export class AvailabilityModule {}
