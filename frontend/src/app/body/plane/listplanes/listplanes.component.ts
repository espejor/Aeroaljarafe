import { Component, OnInit } from "@angular/core";
import { PlaneService } from "../plane.service";
import { Plane } from "../plane.model";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-listplanes",
  templateUrl: "./listplanes.component.html",
  styleUrls: ["./listplanes.component.css"]
})
export class ListplanesComponent implements OnInit {
  planes: Plane[];

  popoverTitle = "Eliminar una Aeronave";
  popoverMessage = "¿Está seguro que quiere eliminar la Aeronave?";

  constructor(
    private planeService: PlaneService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getPlanes();
  }

  getPlanes() {
    this.planeService.getPlanes().subscribe(data => {
      console.log(data.planes);
      this.planes = data.planes;
    });
  }

  deletePlane(id: string) {
    this.planeService.deletePlane(id).subscribe(
      data => {
        console.log(data);
        this.deleteElementFromPlanes(data.plane);
        this.toastr.success(`Se ha eliminado la Aeronave: ${data.plane.plane}`,"¡OK!")
      },
      err => {
        console.error(err);
      }
    );
  }

  private deleteElementFromPlanes(plane: Plane) {
    console.log(JSON.stringify(plane));
    var i = this.findIndex(this.planes, plane);
    this.planes.splice(i, 1);
  }

  private findIndex(array: any[], item: any): number {
    var i = 0;
    for (i; i < array.length; i++) {
      if (array[i]._id == item._id) {
        return i;
      }
    }
    return -1;
  }
}
