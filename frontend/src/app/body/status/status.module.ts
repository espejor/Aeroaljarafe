import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusRoutingModule } from './status-routing.module';
import { ListstatusComponent } from './liststatus/liststatus.component';
import { EditstatusComponent } from './editstatus/editstatus.component';
import { NewstatusComponent } from './newstatus/newstatus.component';

@NgModule({
  declarations: [ListstatusComponent, EditstatusComponent, NewstatusComponent],
  imports: [
    CommonModule,
    StatusRoutingModule
  ]
})
export class StatusModule { }
