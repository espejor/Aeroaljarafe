import { Component, OnInit } from "@angular/core";
import { FlightService } from "../flight.service";
import { Flight } from "../flight.model";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-listflights",
  templateUrl: "./listflights.component.html",
  styleUrls: ["./listflights.component.css"]
})
export class ListflightsComponent implements OnInit {
  flights: Flight[];

  popoverTitle = "Borrar una Marca"
  popoverMessage = "¿Está seguro que quiere eliminar la Marca?"


  constructor(
    private flightService: FlightService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getFlights();
  }

  getFlights() {
    this.flightService.getFlights().subscribe(data => {
      console.log(data.flights);
      this.flights = data.flights;
    });
  }

  deleteFlight(id: string) {
    this.flightService.deleteFlight(id).subscribe(
      data => {
        console.log(data);
        this.deleteElementFromFlights(data.flight);
        this.toastr.success(`Se ha eliminado la Marca: ${data.flight.flight}`,"¡OK!")
      },
      err => {
        console.error(err);
      }
    );
  }

  private deleteElementFromFlights(flight: Flight) {
    console.log(JSON.stringify(flight));
    var i = this.findIndex(this.flights, flight);
    this.flights.splice(i, 1);
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
