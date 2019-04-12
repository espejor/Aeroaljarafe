import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';
import { Flight } from '../flight.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'


@Component({
  selector: 'app-newflight',
  templateUrl: './newflight.component.html',
  styleUrls: ['./newflight.component.css']
})
export class NewflightComponent implements OnInit {
  flight: Flight = new Flight();

  image$ : Observable<any>
  image: File
  
  constructor(
    private flightService:FlightService, 
    private newRoute:Router
  ) {}


  ngOnInit() {

  }

  saveFlight(form): void {

    let formData:FormData = new FormData(form); 

    this.flightService.newFlight(formData)
    .subscribe(res => {
      console.log(res)
      this.newRoute.navigate(['flights'])
    }, (err) => {
      console.log(err);
    })  
    console.log(this.image$)
    console.log(this.image)
  }
}
