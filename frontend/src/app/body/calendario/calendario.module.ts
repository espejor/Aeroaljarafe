import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CalendarioComponent } from "./calendario.component";
import { RowComponent } from "./row/row.component";
import { SegmentComponent } from "./row/segment/segment.component";
import { ButtonComponent } from "./row/segment/button/button.component";
import { ResizingAreaComponent } from "./row/segment/resizing-area/resizing-area.component";
import { CalendarioService } from "./calendario.service";
import { TaskComponent } from "./task/task.component";
import { TasksComponent } from "./tasks/tasks.component";
import { FormsModule } from "@angular/forms";
import { NgbModule, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmationPopoverModule } from "angular-confirmation-popover";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [
    CalendarioComponent,
    RowComponent,
    SegmentComponent,
    ButtonComponent,
    ResizingAreaComponent,
    TaskComponent,
    TasksComponent
  ],
  imports: [
    NgbModule.forRoot(),
    FormsModule,
    ConfirmationPopoverModule,
    CommonModule,
    ToastrModule.forRoot()
  ],
  exports: [
    CalendarioComponent,
    RowComponent,
    SegmentComponent,
    ButtonComponent,
    ResizingAreaComponent
  ],
  providers: [CalendarioService],
  entryComponents: [TaskComponent]
})
export class CalendarioModule {}
