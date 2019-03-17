import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditpersonaluserdataComponent } from '../editpersonaluserdata/editpersonaluserdata.component';
import { EdituserRoutingModule } from './edituser-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditpersonaluserdataComponent],
  imports: [
    CommonModule,
    EdituserRoutingModule,
    ReactiveFormsModule 
  ],
  exports: [
    ReactiveFormsModule,FormsModule
  ]
})
export class EdituserModule { }
