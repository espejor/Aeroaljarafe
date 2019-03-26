import { Component, OnInit } from "@angular/core";
import { FlightService } from "../flight.service";
import { Flight } from "../flight.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { ImgcropperService } from "../../imgcropper/imgcropper.service";

@Component({
  selector: "app-editflight",
  templateUrl: "./editflight.component.html",
  styleUrls: ["./editflight.component.css"]
})
export class EditflightComponent implements OnInit {
  flight = new Flight();
  

  image$: Observable<any>;
  image: File;

  popoverTitle = "Modificar una Marca";
  popoverMessage = "¿Está seguro que quiere modificar la Marca?";
  confirmText = "Modificar";

  constructor(
    private flightService: FlightService,
    private route: ActivatedRoute,
    private newRoute: Router,
    private toastr: ToastrService,
    private imgCropperService: ImgcropperService
  ) {}

  ngOnInit() {
    this.image$ = this.imgCropperService.getImage$();
    this.image$.subscribe(image => (this.image = image));
    this.getFlight();
  }

  getFlight(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.flightService.getFlight(id).subscribe(
      data => {
        this.flight = data.flight;
        console.log(this.flight);
      },
      err => {
        console.error(`Error code: ${err.status}\n${err.error.message}`);
      }
    );
  }

  saveFlight(form): void {
    let formData: FormData = new FormData(form);

    this.flightService.updateFlight(formData, this.flight._id).subscribe(
      res => {
        console.log(res);
        this.newRoute.navigate(["flights"]);
      },
      err => {
        console.error(`Error code: ${err.status}\n${err.error.message}`);
      }
    );

    this.toastr.success(
      `Se ha modificado el registro ${this.flight}`,
      "¡OK!"
    );
  }
}
