import { Component, OnInit } from '@angular/core';
import { AvailabilityService } from '../availability.service';
import { Availability } from '../availability.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newavailability',
  templateUrl: './newavailability.component.html',
  styleUrls: ['./newavailability.component.css']
})
export class NewavailabilityComponent implements OnInit {
  availability: Availability = new Availability();
  
  constructor(private availabilityService:AvailabilityService, private newRoute:Router) { 
    this.availability.availability=""
    this.availability._id=""

  }


  ngOnInit() {
  }

  files:File[]
  
  private uploadImage(files:File[]){
    this.files = files
    $("#image-label").html(files[0].name)
  }

  saveAvailability(form): void {

    let formData:FormData = new FormData(form); 

    this.availabilityService.newAvailability(formData)
    .subscribe(res => {
      console.log(res)
      
      this.newRoute.navigate(['availabilitys'])
    }, (err) => {
      console.log(err);
    })
  }
}
