import { Component, OnInit } from "@angular/core";
import { AvailabilityService } from "../availability.service";
import { Availability } from "../availability.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-editavailability",
  templateUrl: "./editavailability.component.html",
  styleUrls: ["./editavailability.component.css"]
})
export class EditavailabilityComponent implements OnInit {
  availability =  new Availability();
  files:File[]
  

  constructor(private availabilityService: AvailabilityService, private route: ActivatedRoute,private newRoute: Router) {
    
  }

  ngOnInit() {this.getAvailability();}

  
  private uploadImage(files:File[]){
    this.files = files
    $("#image-label").html(files[0].name)
  }

  getAvailability(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.availabilityService.getAvailability(id).subscribe(availability => {
      this.availability = availability.availability;
      console.log(this.availability);
    });
  }

  saveAvailability(form): void {
    if (confirm("¿Estás seguro que deseas modificar el registro?")) {
      let formData:FormData = new FormData(form); 
      this.availabilityService.updateAvailability(formData,this.availability._id).subscribe(res => {
        console.log(res)
        this.newRoute.navigate(['availabilities'])
      });
    }
  }
}
