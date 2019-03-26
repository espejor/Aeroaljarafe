import { Component, OnInit } from "@angular/core";
import { AvailabilityService } from "../availability.service";
import { Availability } from "../availability.model";

@Component({
  selector: "app-listavailabilities",
  templateUrl: "./listavailabilities.component.html",
  styleUrls: ["./listavailabilities.component.css"]
})
export class ListavailabilitiesComponent implements OnInit {
  availabilities: Availability[];
  constructor(private availabilityService: AvailabilityService) {}

  ngOnInit() {
    this.getAvailabilities();
  }

  getAvailabilities() {
    this.availabilityService.getAvailabilities().subscribe(data => {
      console.log(data.availabilities);
      this.availabilities = data.availabilities;
    });
  }

  deleteAvailability(id:string) {
    if (confirm("¿Estás seguro que deseas eliminar el registro?")) {
      this.availabilityService.deleteAvailability(id).subscribe(data => {
        console.log(data)
        if (data){
          this.deleteElementFromAvailabilities(data.availability)
        }else
          console.log(`Error indefinido`)
      }, (err) => {
        console.log(err);
      })
    }
  }

  private deleteElementFromAvailabilities(availability: Availability) {
    console.log(JSON.stringify(availability));
    var i = this.findIndex(this.availabilities, availability);
    this.availabilities.splice(i, 1);
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
