import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CalendarioComponent } from "./calendario.component";
import { RowComponent } from "./row/row.component";
import { SegmentComponent } from "./row/segment/segment.component";
import { ButtonComponent } from "./row/segment/button/button.component";
import { ResizingAreaComponent } from './row/segment/resizing-area/resizing-area.component';
import { CalendarioService } from './calendario.service';
import { TaskComponent } from './task/task.component';
import { TasksComponent } from './tasks/tasks.component';

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
  imports: [CommonModule],
  exports: [
    CalendarioComponent,
    RowComponent,
    SegmentComponent,
    ButtonComponent,
    ResizingAreaComponent
  ],
  providers: [
    CalendarioService
  ]
})
export class CalendarioModule {}
