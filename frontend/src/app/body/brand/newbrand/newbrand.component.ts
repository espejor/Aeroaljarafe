import { Component, OnInit } from '@angular/core';
import { BrandService } from '../brand.service';
import { Brand } from '../brand.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newbrand',
  templateUrl: './newbrand.component.html',
  styleUrls: ['./newbrand.component.css']
})
export class NewbrandComponent implements OnInit {
  brand: Brand = new Brand();
  
  constructor(private brandService:BrandService, private newRoute:Router) { 
    // this.brand.brand=""
    // this.brand._id=""
    // this.brand.extension=""
  }


  ngOnInit() {
  }

  files:File[]
  
  private uploadImage(files:File[]){
    this.files = files
    $("#image-label").html(files[0].name)
  }

  saveBrand(form): void {

    let formData:FormData = new FormData(form); 

    this.brandService.newBrand(formData)
    .subscribe(res => {
      console.log(res)
      this.newRoute.navigate(['brands'])
    }, (err) => {
      console.log(err);
    })
  }
}
